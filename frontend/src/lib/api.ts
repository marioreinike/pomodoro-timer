import axios, { AxiosInstance } from 'axios';
import { ISession } from '../interfaces';

export default class Api {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.API_URL,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async createSession(sessionBody: Partial<ISession>): Promise<ISession> {
    return sessionBody as unknown as ISession;
    // const response = await this.axios.post<ISession>('/sessions', sessionBody);
    // return response.data;
  }

  // eslint-disable-next-line class-methods-use-this
  async getSessions(): Promise<ISession[]> {
    return [];
    // const response = await this.axios.get<ISession[]>('/sessions');
    // return response.data;
  }
}
