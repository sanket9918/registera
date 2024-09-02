import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";

import {
    CreateFormInput,
    Form,
    GetFormByUser,
    GetFormInput,
} from "../schema/form.schema";
import FormService from "../service/form.service";
import Context from "../types/context";

@Resolver()
export default class FormResolver {
    constructor(private formService: FormService) {
        this.formService = new FormService();
    }

    @Authorized("ADMIN", "USER")
    @Mutation(() => Form)
    createForm(@Arg("input") input: CreateFormInput, @Ctx() context: Context) {
        const user = context.user;
        return this.formService.createForm({ ...input, user: user!._id });
    }

    @Query(() => [Form])
    forms() {
        return this.formService.findForm();
    }

    @Query(() => Form)
    form(@Arg("input") input: GetFormInput) {
        return this.formService.findByProductId(input);
    }
    @Authorized("USER")
    @Query(() => [Form])
    findByUser(@Arg("input") input: GetFormByUser) {
        return this.formService.findByUser(input);
    }
}
