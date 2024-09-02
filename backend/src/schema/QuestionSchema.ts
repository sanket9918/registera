import { prop as Property } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

// function DefaultValue<T>(defaultValue: T): MiddlewareFn {
//   return async (_, next) => {
//     const original = await next();
//     if (original === undefined || original === null) {
//       return defaultValue;
//     }
//     return original;
//   };
// }

@ObjectType()
export class QuestionSchema {
    @Field(() => String)
    @Property()
    quesId: string;

    @Field(() => String)
    @Property({ required: false })
    question?: string;

    @Field(() => String)
    @Property({ required: false, default: () => "" })
    answer?: string;
}
