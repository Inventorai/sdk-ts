import { HttpClient } from '../http/client';

export class StatsResource {
  constructor(private http: HttpClient) {}

  async index(): Promise<any> {
    return this.http.get('/stats');
  }

  async team(): Promise<any> {
    return this.http.get('/stats/team');
  }

  async user(): Promise<any> {
    return this.http.get('/stats/user');
  }

  async schedule(): Promise<any> {
    return this.http.get('/dashboard/schedule');
  }
}
