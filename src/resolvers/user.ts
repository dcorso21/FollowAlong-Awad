import { User } from "../entities/User";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import argon2 from "argon2";

@InputType()
class UsernamePasswordInput {
    @Field()
    username!: string; // Bang sign means that you dont have to declare in the constructor
    @Field()
    password!: string;
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
}
