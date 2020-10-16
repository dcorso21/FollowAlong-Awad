import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
// Property @ classifies it as a db column
export class Post {
    @PrimaryKey()
    id!: number;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    @Property()
    title!: string;
}
