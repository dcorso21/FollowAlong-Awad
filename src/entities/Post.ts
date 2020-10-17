import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

// Property @ classifies it as a db column
@ObjectType()
@Entity()
export class Post {
    @Field(() => Int) // Relates to Object Type, optional if you dont want to show
    @PrimaryKey() // Relates to Entity. Not Optional
    id!: number;

    @Field(() => String)
    @Property({ type: "date" })
    createdAt = new Date();

    @Field(() => String)
    @Property({ type: "date", onUpdate: () => new Date() })
    updatedAt = new Date();

    @Field()
    @Property({ type: "text" })
    title!: string;
}
