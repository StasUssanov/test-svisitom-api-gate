import { loadFilesSync } from '@graphql-tools/load-files';
import { PubSub } from 'graphql-subscriptions';
import { appResolvers } from './_app/resolvers';
import { appSubTriggers } from './_app/subscription-triggers';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { authResolvers } from './auth/resolvers';
import { coreResolvers } from './core/resolvers';

const typesList = loadFilesSync('**/schema/*.graphql');
const typeDefs = mergeTypeDefs(typesList);

const resolvers = {
  Query: {
    ...appResolvers.Query,
    ...coreResolvers.Query,
  },
  Mutation: {
    ...appResolvers.Mutation,
    ...authResolvers.Mutation,
    ...coreResolvers.Mutation,
  },
  Subscription: {
    ...appResolvers.Subscription,
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export const pubSub = new PubSub();
export const triggers = {
  ...appSubTriggers,
};
