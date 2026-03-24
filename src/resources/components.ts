import { HttpClient } from '../http/client';
import { Component, PaginatedResponse, ListParams } from '../types';

export class Components {
  constructor(private http: HttpClient) {}

  async list(params: ListParams = {}): Promise<PaginatedResponse<Component>> {
    return this.http.get('/components', params);
  }
}
