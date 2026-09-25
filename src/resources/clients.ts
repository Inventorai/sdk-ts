import { HttpClient } from '../http/client';
import { Client, ClientGroup, ClientListParams, ListParams, PaginatedResponse } from '../types';

function withInclude<T extends { include?: string | string[] }>(params: T): Omit<T, 'include'> & { include?: string } {
  const { include, ...rest } = params;
  return include === undefined
    ? rest
    : { ...rest, include: Array.isArray(include) ? include.join(',') : include };
}

export class Clients {
  constructor(private http: HttpClient) {}

  async list(params: ClientListParams = {}): Promise<PaginatedResponse<Client>> {
    return this.http.get('/clients', withInclude(params));
  }

  async get(id: string, params: { include?: string | string[] } = {}): Promise<{ data: Client }> {
    return this.http.get(`/clients/${id}`, withInclude(params));
  }

  async groups(params: ListParams = {}): Promise<PaginatedResponse<ClientGroup>> {
    return this.http.get('/clients/groups', withInclude(params));
  }

  async group(id: string, params: { include?: string | string[] } = {}): Promise<{ data: ClientGroup }> {
    return this.http.get(`/clients/groups/${id}`, withInclude(params));
  }
}
