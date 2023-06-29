import axios, { AxiosError, AxiosInstance } from 'axios';
import { ISession } from '../interfaces';

export default class Api {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
  }

  async makeRequest<T>(url: string, method: 'get' | 'post' | 'put' | 'delete', body?: Partial<T>): Promise<T> {
    try {
      const response = await this.axios.request<T>({
        url,
        method,
        data: body,
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data as string;
      throw new Error(errorMessage);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async createSession(sessionBody: Partial<ISession>): Promise<ISession> {
    const data = await this.makeRequest<ISession>('/sessions', 'post', sessionBody);
    return data;
  }

  // eslint-disable-next-line class-methods-use-this
  async getSessions(): Promise<ISession[]> {
    const data = await this.makeRequest<ISession[]>('/sessions', 'get');
    return data;
  }
}
