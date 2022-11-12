import { loadFilesSync } from '@graphql-tools/load-files';
import { PubSub } from 'graphql-subscriptions';
import { appResolvers } from './_app/resolvers';
import { appSubTriggers } from './_app/subscription-triggers';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

const typesList = loadFilesSync('**/schema/*.graphql');
export const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(typesList),
  resolvers: {
    ...appResolvers,
  },
});

export const pubSub = new PubSub();
export const triggers = {
  ...appSubTriggers,
};