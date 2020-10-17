import "reflect-metadata"; // Apparently A Dependency of type-graphQL
import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
// import { Post } from "./entities/Post";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/posts";

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    // await orm.getMigrator().up(); // Automatically Runs Migration

    const app = express();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver],
            validate: false,
        }),
        context: () => ({ em: orm.em }),
    });

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log("server started on localhost:4000");
    });
    // const post = orm.em.create(Post, { title: "my first post" });
    // await orm.em.persistAndFlush(post);
    // await orm.em.nativeInsert(Post, { title: "my first post" })
};

main().catch((err) => {
    console.log(err);
});

// console.log("Hello World");
