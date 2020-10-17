import { Ctx, Query, Resolver } from "type-graphql";
import "reflect-metadata"; // Apparently A Dependency of type-graphQL
import { Post } from "../entities/Post";
import { MyContext } from "../types";

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(@Ctx() { em }: MyContext): Promise<Post[]> {
        return em.find(Post, {});
    }
}
