import { config } from '../../config';
import { CoreApi } from './core-api';

export * from './types';
export const coreApi = new CoreApi(config.api.core);
