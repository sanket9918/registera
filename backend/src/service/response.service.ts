import { ApolloError } from "apollo-server";
import mongoose from "mongoose";

import { FormModel } from "../schema/form.schema";
import {
    CreateResponseInput,
    GetResponseByForm,
    GetResponseByUser,
    ResponseModel,
} from "../schema/response.schema";
import { User } from "../schema/user.schema";

class ResponseService {
    async createResponse(
        input: CreateResponseInput & { user: User["_id"] } & {
            userEmail: User["email"];
        } & { userName: User["name"] },
    ) {
        const errorResponseExists = "Response already exists";
        const errorFormNotExists = "Form does not exists";
        const formValidity = await FormModel.findOne({ _id: input.form });
        if (!formValidity) {
            throw new ApolloError(errorFormNotExists);
        }
        const responseValidity = await ResponseModel.findOne({
            user: input.user,
            form: input.form,
        });
        if (responseValidity) {
            throw new ApolloError(errorResponseExists);
        }

        input.questions.forEach((e) => {
            e.ansId = new mongoose.Types.ObjectId().toString();
        });
        return ResponseModel.create(input);
    }

    async findAllResponses() {
        const responses = await ResponseModel.find();
        if (!responses) {
            throw new ApolloError("No responses found");
        }
        return responses;
    }

    async findResponseByForm(input: GetResponseByForm) {
        const errorForm = "No such response to the query found";
        const response = await ResponseModel.find({ form: input.formId });

        if (!response) {
            throw new ApolloError(errorForm);
        }
        return response;
    }

    async findResponseByUser(input: GetResponseByUser) {
        const errorUser = "No such user found";

        const responses = await ResponseModel.find({ user: input.userId });
        if (!responses) {
            throw new ApolloError(errorUser);
        }

        return responses;
    }
}

export default ResponseService;
