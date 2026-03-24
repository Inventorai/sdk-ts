import { HttpClient } from '../http/client';
import { Property, CreatePropertyData, PaginatedResponse, ListParams } from '../types';

export class Properties {
  constructor(private http: HttpClient) {}

  async list(params: ListParams = {}): Promise<PaginatedResponse<Property>> {
    return this.http.get('/properties', params);
  }

  async get(id: number | string, params: { include?: string | string[] } = {}): Promise<{ data: Property }> {
    const query = params.include
      ? { include: Array.isArray(params.include) ? params.include.join(',') : params.include }
      : {};
    return this.http.get(`/properties/${id}`, query);
  }

  async create(data: CreatePropertyData): Promise<{ data: Property }> {
    return this.http.post('/properties', data);
  }

  async activeTenancy(propertyId: number | string): Promise<{ data: any }> {
    return this.http.get(`/properties/${propertyId}/active-tenancy`);
  }

  async uploadCoverImage(propertyId: number | string, file: File | Blob | Buffer): Promise<any> {
    return this.http.upload(`/properties/${propertyId}/cover-image`, file, 'cover_image');
  }

  async deleteCoverImage(propertyId: number | string): Promise<void> {
    return this.http.delete(`/properties/${propertyId}/cover-image`);
  }
}
