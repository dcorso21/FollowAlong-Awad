import { User } from "../entities/User";
import { MyContext } from "src/types";
import {
    Arg,
    Ctx,
    Field,
    InputType,
    Mutation,
    ObjectType,
    Resolver,
} from "type-graphql";
import argon2 from "argon2";

@InputType()
class UsernamePasswordInput {
    @Field()
    username!: string; // Bang sign means that you dont have to declare in the constructor
    @Field()
    password!: string;
}

@ObjectType()
class FieldError {
    @Field()
    field!: string;
    @Field()
    message!: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];
    @Field(() => User, { nullable: true })
    user?: User;
}

@Resolver()
export class UserResolver {
    @Mutation(() => User)
    async register(
        @Arg("options") options: UsernamePasswordInput,
        @Ctx() { em }: MyContext
    ): Promise<UserResponse> {
        if (options.username.length <= 2) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "length must be greater than 2 characters",
                    },
                ],
            };
        }
        if (options.password.length <= 2) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "length must be greater than 2 characters",
                    },
                ],
            };
        }

        const hashedPass = await argon2.hash(options.password);
        const user = em.create(User, {
            username: options.username,
            password: hashedPass,
        });
        try {
            await em.persistAndFlush(user);
        } catch (err) {
            if (err.name === "UniqueConstraintViolationException") {
                return {
                    errors: [
                        {
                            field: "username",
                            message: "username already exists",
                        },
                    ],
                };
            } else {
                return {
                    errors:[{
                            field: "username",
                            message: "",
                    }]
                }
            }
        }
        return { user };
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("options") options: UsernamePasswordInput,
        @Ctx() { em }: MyContext
    ): Promise<UserResponse> {
        const user = await em.findOne(User, {
            username: options.username,
        });
        if (!user) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "that username doesn't exist",
                    },
                ],
            };
        }
        //Verfiy Password is correct on login
        const valid = await argon2.verify(user.password, options.password);
        if (!valid) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "incorrect password",
                    },
                ],
            };
        }

        return {
            user,
        };
    }
}
