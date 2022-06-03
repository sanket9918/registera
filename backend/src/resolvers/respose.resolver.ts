import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { CreateResponseInput, GetResponseByForm, GetResponseByUser, Response } from '../schema/response.schema';
import ResponseService from '../service/response.service';
import Context from '../types/context';

@Resolver()
export default class ResponseResolver {
  constructor(private responseService: ResponseService) {
    this.responseService = new ResponseService();
  }

  @Authorized('ADMIN', 'USER')
  @Mutation(() => Response)
  createResponse(@Arg('input', { nullable: true }) input: CreateResponseInput, @Ctx() context: Context) {
    const user = context.user;
    return this.responseService.createResponse({
      ...input,
      user: user!._id,
      userEmail: user!.email,
      userName: user!.name,
    });
  }

  @Authorized('ADMIN')
  @Query(() => [Response])
  findAllResponses() {
    return this.responseService.findAllResponses();
  }

  @Authorized('ADMIN', 'USER')
  @Query(() => [Response])
  findResponseByForm(@Arg('input') input: GetResponseByForm) {
    return this.responseService.findResponseByForm(input);
  }

  @Authorized('ADMIN', 'USER')
  @Query(() => [Response])
  findResponseByUser(@Arg('input') input: GetResponseByUser) {
    return this.responseService.findResponseByUser(input);
  }
}
