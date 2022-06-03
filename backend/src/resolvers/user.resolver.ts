import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { CreateUserInput, LoginInput, User, UserToken } from '../schema/user.schema';
import UserService from '../service/user.service';
import Context from '../types/context';

// Dependency injection style

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => User)
  createUser(@Arg('input') input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => UserToken) //As JWT token is a string only
  login(@Arg('input') input: LoginInput, @Ctx() context: Context) {
    console.log(context);
    return this.userService.loginUser(input, context);
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() context: Context) {
    return context.user;
  }

  @Mutation(() => String)
  logout(@Ctx() context: Context) {
    return this.userService.logoutUser(context);
  }
}
