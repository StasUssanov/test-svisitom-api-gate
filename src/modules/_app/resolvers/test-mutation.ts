import { pubSub, triggers } from '../../index';

export const testMutation = (): Promise<string> => pubSub
  .publish(triggers.APP_TEST, { test: Date.now() })
  .then(() => 'test ok');
