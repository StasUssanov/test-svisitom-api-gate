import { TCommon } from '../api-client';

export type TAuthRequest = {
  username: string;
  password: string;
}

export type TAuthResponse = TCommon & {
  accessToken?: string;
  refreshToken?: string;
}
