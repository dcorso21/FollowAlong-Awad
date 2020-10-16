import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from 'path';

export default {
    migrations: {
        path: path.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]$/, // regex pattern for the migration files
    },
    entities: [Post],
    dbName: "tut_demo",
    type: "postgresql",
    user: "David",
    password: "1234",
    debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
