import { testQuery } from './test-query';
import { testMutation } from './test-mutation';
import { pubSub, triggers } from '../../index';

export const appResolvers = {
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
