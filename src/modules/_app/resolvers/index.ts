import { testQuery } from './test-query';
import { testMutation } from './test-mutation';
import { pubSub, triggers } from '../../index';
import { IResolvers } from '@graphql-tools/utils';
import { TContext } from '../../../context/types';

export const appResolvers: IResolvers<unknown, TContext> = {
  Query: {
    test: testQuery,
  },
  Mutation: {
    test: testMutation,
  },
  Subscription: {
    test: {
      subscribe: () => pubSub.asyncIterator(triggers.APP_TEST),
    },
  },
};
