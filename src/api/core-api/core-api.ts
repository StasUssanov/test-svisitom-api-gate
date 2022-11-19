import { ApiClient, Statuses } from '../api-client';
import { TCoreRequest, TCoreStatusesResponse, TCoreStatusResponse } from './types';

export class CoreApi extends ApiClient {

  private statusUrl = '/status';

  constructor(baseURL: string, token?: string) {
    super(`${baseURL}`, token);
  }

  getStatuses(): Promise<TCoreStatusesResponse> {
    return this._client.get(`${this.statusUrl}/list`)
      .then(response => ({
        data: response.data,
        status: Statuses.SUCCESS,
      }))
      .catch(error => {
        const status = error.response?.data;
        if (status) return ({ status });
        throw error;
      });
  }

  updateStatus(params: TCoreRequest): Promise<TCoreStatusResponse> {
    return this._client.put(`${this.statusUrl}`, { ...params.status })
      .then(response => ({
        data: response.data,
        status: Statuses.SUCCESS,
      }))
      .catch(error => {
        const status = error.response?.data;
        if (status) return ({ status });
        throw error;
      });
  }

  statusGroupUpdate(params: TCoreRequest): Promise<TCoreStatusesResponse> {
    return this._client.put(`${this.statusUrl}/list`, params.statuses)
      .then(response => ({
        data: response.data,
        status: Statuses.SUCCESS,
      }))
      .catch(error => {
        const status = error.response?.data;
        if (status) return ({ status });
        throw error;
      });
  }
}
