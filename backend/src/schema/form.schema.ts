import {
    prop as Property,
    Ref,
    getModelForClass,
    index,
    modelOptions,
} from "@typegoose/typegoose";
import { MaxLength, MinLength } from "class-validator";
import { SchemaOptions } from "mongoose";
import { customAlphabet } from "nanoid";
import { Field, InputType, ObjectType } from "type-graphql";

import { QuestionSchema } from "./QuestionSchema";
import { User } from "./user.schema";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz123456789", 10);
const schemaOptions: SchemaOptions = {
    timestamps: true,
};
@index({ user: 1 })
@modelOptions({
    options: {
        allowMixed: 0,
    },
})
@ObjectType()
export class Form {
    @Field(() => String)
    _id!: string;

    @Field(() => String)
    @Property({ required: true, ref: () => User })
    user: Ref<User>;

    @Field(() => String)
    @Property({ required: true })
    name!: string;

    @Field(() => String)
    @Property({ required: false })
    description?: string;

    @Field(() => String)
    @Property({
        required: true,
        default: () => `form_${nanoid()}`,
        unique: true,
    })
    formId: string;

    @Field(() => [QuestionSchema])
    @Property({ required: false })
    questions: [QuestionSchema];
}

export const FormModel = getModelForClass<typeof Form>(Form, { schemaOptions });

@InputType()
export class CreateFormQuestionInput {
    @Field({ defaultValue: `ques` })
    quesId?: string;
    @Field()
    question: string;
    @Field()
    @Property({ required: false, default: () => "" })
    answer: string;
}
@InputType()
export class CreateFormInput {
    @Field()
    name: string;

    @MinLength(1, {
        message:
            "Description is just a short info. Please give at least 1 character",
    })
    @MaxLength(1000, {
        message: "Whoa!,Hold on.Please dont exceed 1000 characters.",
    })
    @Field()
    description: string;

    @Field(() => [CreateFormQuestionInput])
    questions: [CreateFormQuestionInput];
}

@InputType()
export class GetFormInput {
    @Field()
    formId: string;
}

@InputType()
export class GetFormByUser {
    @Field()
    userId: string;
}
