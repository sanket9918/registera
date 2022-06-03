import FormResolver from './form.resolver';
import ResponseResolver from './respose.resolver';
import UserResolver from './user.resolver';

export const resolvers = [UserResolver, FormResolver, ResponseResolver] as const;
