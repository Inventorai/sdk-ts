import { HttpClient } from '../http/client';
import { User } from '../types';

export class UserResource {
  constructor(private http: HttpClient) {}

  async me(): Promise<{ data: User }> {
    return this.http.get('/user');
  }
}
