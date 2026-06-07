import { HttpClient } from '../http/client';
import { Branch, PaginatedResponse, ListParams } from '../types';

export class Branches {
  constructor(private http: HttpClient) {}

  async list(params: ListParams = {}): Promise<PaginatedResponse<Branch>> {
    return this.http.get('/branches', params);
  }

  async get(id: number | string): Promise<{ data: Branch }> {
    return this.http.get(`/branches/${id}`);
  }
}
