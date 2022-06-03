import { ApolloError } from 'apollo-server';
import mongoose from 'mongoose';
import { CreateFormInput, FormModel, GetFormByUser, GetFormInput } from '../schema/form.schema';
import { User } from '../schema/user.schema';

class FormService {
  async createForm(input: CreateFormInput & { user: User['_id'] }) {
    input.questions.forEach((e) => {
      e.quesId = new mongoose.Types.ObjectId().toString();
    });
    return FormModel.create(input);
  }

  async findForm() {
    return await FormModel.find().lean().exec();
  }

  async findByProductId(input: GetFormInput) {
    const errorMessage = 'The product with such ID not found';

    const form = await FormModel.findOne(input).lean();
    if (!form) {
      throw new ApolloError(errorMessage);
    }
    return form;
  }

  async findByUser(input: GetFormByUser) {
    const errorMesssage = 'No form for such user found.';
    const form = await FormModel.find({ user: input.userId }).lean();
    if (!form) {
      throw new ApolloError(errorMesssage);
    }
    return form;
  }
}

export default FormService;
