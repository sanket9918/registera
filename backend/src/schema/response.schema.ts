import {
    prop as Property,
    Ref,
    getModelForClass,
    index,
    modelOptions,
    pre,
} from "@typegoose/typegoose";
import { SchemaOptions } from "mongoose";
import { customAlphabet } from "nanoid";
import { Field, InputType, ObjectType } from "type-graphql";

import { QuestionSchema } from "./QuestionSchema";
import { Form } from "./form.schema";
import { User } from "./user.schema";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz123456789", 10);
const schemaOptions: SchemaOptions = {
    timestamps: true,
};

@index({ form: 1, user: 1 })
@modelOptions({
    options: {
        allowMixed: 0,
    },
})
@ObjectType()
export class Response {
    @Field(() => String)
    _id!: string;

    @Field(() => String)
    @Property({ required: true, ref: () => Form })
    form: Ref<Form>;

    @Field(() => String)
    @Property({ required: true, ref: () => User })
    user!: Ref<User>;

    @Field(() => String)
    @Property()
    userEmail: string;
    @Field(() => String)
    @Property()
    userName: string;

    @Field(() => String)
    @Property({
        required: true,
        default: () => `res_${nanoid()}`,
        unique: true,
    })
    resId: string;

    @Field(() => [QuestionSchema])
    @Property({ required: false })
    questions: [QuestionSchema];
}

export const ResponseModel = getModelForClass<typeof Response>(Response, {
    schemaOptions,
});

@InputType()
export class CreateQuestionAnswerInput {
    @Field({ defaultValue: `ans_${nanoid()}` })
    ansId?: string;
    @Field()
    quesId: string;
    @Field()
    question: string;
    @Field()
    answer: string;
}

@InputType()
export class CreateResponseInput {
    @Field()
    form: string;

    @Field(() => [CreateQuestionAnswerInput])
    questions: [CreateQuestionAnswerInput];
}

@InputType()
export class GetResponseInput {
    @Field()
    resId: string;
}

@InputType()
export class GetResponseByForm {
    @Field()
    formId: string;
}

@InputType()
export class GetResponseByUser {
    @Field()
    userId: string;
}
