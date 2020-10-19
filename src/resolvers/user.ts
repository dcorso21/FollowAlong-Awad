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
class UserResponse {
    @Field()
    errors?: Error[];
    @Field()
    user?: User[];
}

@Resolver()
export class UserResolver {
    @Mutation(() => User)
    async register(
        @Arg("options") options: UsernamePasswordInput,
        @Ctx() { em }: MyContext
    ) {
        const hashedPass = await argon2.hash(options.password);
        const user = em.create(User, {
            username: options.username,
            password: hashedPass,
        });
        await em.persistAndFlush(user);
        return user;
    }

    @Mutation(() => User)
    async login(
        @Arg("options") options: UsernamePasswordInput,
        @Ctx() { em }: MyContext
    ) {
        const user = await em.findOne(User, {
            username: options.username.toLowerCase(),
        });
        if (!user) {
            return {
                errors: [{}],
            };
        }
        return user;
    }
}
