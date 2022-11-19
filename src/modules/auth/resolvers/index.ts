import { authServiceApi, TAuthRequest } from '../../../api/auth-service-api';
import { TContext } from '../../../context/types';

export const authResolvers = {
  Mutation: {
    signUp: (_: never, params: TAuthRequest) => authServiceApi.createUser(params),
    signIn: (_: never, params: TAuthRequest) => authServiceApi.getTokens(params),
    refreshTokens: (_: never, __: never, context: TContext) => authServiceApi.refreshTokens(context),
    signOut: (_: never, __: never, context: TContext) => authServiceApi.killTokens(context),
  },
};
