import { TContext } from './types';

export const context = (args): Promise<TContext> => {
  return Promise.resolve({
    authorization: args.req.headers.authorization,
  });
};
