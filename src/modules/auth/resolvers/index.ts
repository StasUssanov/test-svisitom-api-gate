import { authServiceApi, TAuthRequest } from '../../../api/auth-service-api';
import { TContext } from '../../../context/types';
import { IResolvers } from '@graphql-tools/utils/typings';

export const authResolvers: IResolvers<unknown, TContext> = {
  Mutation: {
    signUp: (_: never, params: TAuthRequest) => authServiceApi.createUser(params),
    signIn: (_: never, params: TAuthRequest) => authServiceApi.getTokens(params),
    refreshTokens: (_: never, __: never, context: TContext) => authServiceApi.refreshTokens(context),
    signOut: (_: never, __: never, context: TContext) => authServiceApi.killTokens(context),
  },
};
