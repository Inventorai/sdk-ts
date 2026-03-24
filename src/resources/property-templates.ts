import { HttpClient } from '../http/client';
import { PropertyTemplate, PaginatedResponse, ListParams } from '../types';

export class PropertyTemplates {
  constructor(private http: HttpClient) {}

  async list(params: ListParams = {}): Promise<PaginatedResponse<PropertyTemplate>> {
    return this.http.get('/property-templates', params);
  }

  async get(id: number | string): Promise<{ data: PropertyTemplate }> {
    return this.http.get(`/property-templates/${id}`);
  }
}
