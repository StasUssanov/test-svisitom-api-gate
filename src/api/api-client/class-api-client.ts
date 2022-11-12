import axios, { AxiosInstance } from 'axios';
import { IApiClient } from './types';

//TODO добавть логику для отлавливания 500 ошибки
export abstract class ApiClient implements IApiClient {
  protected _client: AxiosInstance;

  protected constructor(baseURL: string, token?: string) {
    const headers: { authorization?: string } = {};
    if (token) headers.authorization = `Bearer ${token}`;
    this._client = axios.create({ baseURL, headers });
  }
}
