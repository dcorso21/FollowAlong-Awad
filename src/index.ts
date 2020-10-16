import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";

const main = async () => {
    const orm = await MikroORM.init({
        dbName: "tut_demo",
        type: "postgresql",
        user: "David",
        password: "1234",
        debug: !__prod__,
        entities: [Post],
    });

    const post = orm.em.create(Post, { title: "my first post" });
    await orm.em.persistAndFlush(post);
    console.log("sql2 ---- ");
    await orm.em.nativeInsert(Post, { title: "my first post" })
};

main().catch(err => {
    console.log(err);
});

// console.log("Hello World");
