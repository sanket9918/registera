import { Field, ObjectType, MiddlewareFn, UseMiddleware } from 'type-graphql';
import { prop as Property } from '@typegoose/typegoose';
import { customAlphabet } from 'nanoid';
import mongoose from 'mongoose';
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz123456789', 10);

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
  @Property({ required: false, default: () => '' })
  answer?: string;
}
