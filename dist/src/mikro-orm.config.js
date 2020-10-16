"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const Post_1 = require("./entities/Post");
exports.default = {
    dbName: "tut_demo",
    type: "postgresql",
    user: "David",
    password: "1234",
    debug: !constants_1.__prod__,
    entities: [Post_1.Post],
};
//# sourceMappingURL=mikro-orm.config.js.map