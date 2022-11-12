import { config } from '../../config';
import { AuthServiceApi } from './auth-service-api';

export * from './types';
export const authServiceApi = new AuthServiceApi(config.api.auth);
