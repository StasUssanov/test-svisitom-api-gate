import { coreApi, TCoreRequest } from '../../../api/core-api';
import { TContext } from '../../../context/types';
import { IResolvers } from '@graphql-tools/utils';
import { AuthServiceApi } from '../../../api/auth-service-api/auth-service-api';

const auth = AuthServiceApi.check;

export const coreResolvers: IResolvers<unknown, TContext> = {
  Query: {
    statuses: (_: never, params: never, context) => auth(context, coreApi.getStatuses()),
  },
  Mutation: {
    statusUpdate: (_: never, params: TCoreRequest, context) => auth(context, coreApi.updateStatus(params)),
    statusGroupUpdate: (_: never, params: TCoreRequest, context) => auth(context, coreApi.statusGroupUpdate(params)),
  },
};
