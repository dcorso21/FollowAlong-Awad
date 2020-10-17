import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import "reflect-metadata"; // Apparently A Dependency of type-graphQL
import { Post } from "../entities/Post";
import { MyContext } from "../types";

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(@Ctx() { em }: MyContext): Promise<Post[]> {
        return em.find(Post, {});
    }

    @Query(() => Post, { nullable: true })
    post(
        @Arg("id", () => Int) id: number, // Can call arg anything, but is good to keep consistent
        @Ctx() { em }: MyContext
    ): Promise<Post | null> {
        return em.findOne(Post, { id });
    }

    @Mutation(() => Post, { nullable: true })
    async createPost(
        @Arg("title") title: string, // Can call arg anything, but is good to keep consistent
        @Ctx() { em }: MyContext
    ): Promise<Post | null> {
        const post = em.create(Post, { title });
        await em.persistAndFlush(post);
        return post;
    }
}
