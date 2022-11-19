import { ApiClient, Statuses, TCommon } from '../api-client';
import { TAuthRequest, TAuthResponse } from './types';
import { TContext } from '../../context/types';
import JwtDecode, { JwtPayload } from 'jwt-decode';

export class AuthServiceApi extends ApiClient {

  private tokenUrl = '/auth';
  private userUrl = '/user';

  constructor(baseURL: string, token?: string) {
    super(`${baseURL}`, token);
  }

  getTokens(params: TAuthRequest): Promise<TAuthResponse> {
    return this._client.post(this.tokenUrl, params)
      .then(response => ({
        ...response.data,
        status: Statuses.SUCCESS,
      }))
      .catch(error => {
        const status = error.response?.data;
        if (status) return ({ status });
        throw error;
      });
  }

  createUser(params: TAuthRequest) {
    return this._client.post(this.userUrl, params)
      .then(() => this.getTokens(params))
      .catch(error => {
        const status = error.response?.data;
        if (status) return ({ status });
        throw error;
      });
  }

  refreshTokens(params: TContext): Promise<TAuthResponse> {
    return this._client.put(this.tokenUrl, null, { headers: { authorization: params.authorization } })
      .then(response => ({
        ...response.data,
        status: Statuses.SUCCESS,
      }))
      .catch(error => {
        const status = error.response?.data;
        if (status) return ({ status });
        throw error;
      });
  }

  killTokens(params: TContext): Promise<TCommon> {
    return this._client.delete(this.tokenUrl, { headers: { authorization: params.authorization } })
      .then(() => ({ status: Statuses.SUCCESS }))
      .catch(error => {
        const status = error.response?.data;
        if (status) return ({ status });
        throw error;
      });
  }

  static check<R>(context: TContext, fn: Promise<R>): Promise<TCommon | R> {
    if (context?.authorization) {
      const jwt: JwtPayload & { typ?: string } = JwtDecode(context.authorization);
      if (jwt.typ !== 'Bearer') return Promise.resolve({ status: 'TOKEN_WRONG' });
      if ((jwt.exp * 1000) > Date.now()) return fn;
    }
    return Promise.resolve({ status: 'TOKEN_FAIL' });
  }
}
