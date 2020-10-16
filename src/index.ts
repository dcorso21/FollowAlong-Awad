import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config"

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up(); // Automatically Runs Migration
    console.log("helllo!");
    const post = orm.em.create(Post, { title: "my first post" });
    await orm.em.persistAndFlush(post);
    // await orm.em.nativeInsert(Post, { title: "my first post" })
};

main().catch(err => {
    console.log(err);
});

// console.log("Hello World");
