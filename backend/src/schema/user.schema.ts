import {
    prop as Property,
    ReturnModelType,
    getModelForClass,
    index,
    modelOptions,
    pre,
    queryMethod,
} from "@typegoose/typegoose";
import { AsQueryMethod } from "@typegoose/typegoose/lib/types";
import bcrypt from "bcrypt";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { SchemaOptions } from "mongoose";
import { Field, InputType, ObjectType } from "type-graphql";

interface QueryHelpers {
    findByEmail: AsQueryMethod<typeof findByEmail>;
}

function findByEmail(
    this: ReturnModelType<typeof User, QueryHelpers>,
    email: User["email"],
) {
    return this.findOne({ email });
}

const schemaOptions: SchemaOptions = {
    timestamps: true,
};

@ObjectType()
export class UserToken {
    @Field(() => String)
    token?: string;
}

@pre<User>("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hashSync(this.password, salt);

    this.password = hash;
})
@modelOptions({
    options: {
        allowMixed: 0,
    },
})
@index({ email: 1 })
@queryMethod(findByEmail)
@ObjectType()
export class User {
    @Field(() => String)
    _id!: string;

    @Field(() => String)
    @Property({ required: true })
    name!: string;

    @Field(() => String)
    @Property({ required: true })
    email!: string;

    @Property({ required: true })
    password!: string;

    @Property({ required: true })
    @Field(() => [String])
    roles!: string[];
}

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User, {
    schemaOptions,
});

// For the input of the type user

@InputType()
export class CreateUserInput {
    @Field(() => String)
    name!: string;

    @IsEmail()
    @Field(() => String)
    email!: string;

    @MinLength(6, {
        message: "Password must be at least 6 characters long",
    })
    @MaxLength(50, {
        message: "Password must not be longer than 50 characters",
    })
    @Field(() => String)
    password!: string;

    @Field(() => [String])
    roles!: string[];
}

@InputType()
export class LoginInput {
    @Field(() => String)
    email!: string;

    @Field(() => String)
    password!: string;
}
