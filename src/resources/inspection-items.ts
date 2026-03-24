import { HttpClient } from '../http/client';
import { InspectionItem, CreateInspectionItemData, UpdateInspectionItemData, PaginatedResponse, ListParams } from '../types';

export class InspectionItems {
  constructor(private http: HttpClient) {}

  async list(inspectionId: number | string, params: ListParams = {}): Promise<PaginatedResponse<InspectionItem>> {
    return this.http.get(`/inspections/${inspectionId}/items`, params);
  }

  async get(inspectionId: number | string, itemId: string, params: { include?: string | string[] } = {}): Promise<{ data: InspectionItem }> {
    const query = params.include
      ? { include: Array.isArray(params.include) ? params.include.join(',') : params.include }
      : {};
    return this.http.get(`/inspections/${inspectionId}/items/${itemId}`, query);
  }

  async create(inspectionId: number | string, data: CreateInspectionItemData): Promise<{ data: InspectionItem }> {
    return this.http.post(`/inspections/${inspectionId}/items`, data);
  }

  async update(inspectionId: number | string, itemId: string, data: UpdateInspectionItemData): Promise<{ data: InspectionItem }> {
    return this.http.patch(`/inspections/${inspectionId}/items/${itemId}`, data);
  }

  async delete(inspectionId: number | string, itemId: string): Promise<void> {
    return this.http.delete(`/inspections/${inspectionId}/items/${itemId}`);
  }

  async duplicate(inspectionId: number | string, itemId: string): Promise<{ data: InspectionItem }> {
    return this.http.post(`/inspections/${inspectionId}/items/${itemId}/duplicate`);
  }

  async uploadPhoto(inspectionId: number | string, itemId: string, file: File | Blob | Buffer): Promise<any> {
    return this.http.upload(`/inspections/${inspectionId}/items/${itemId}/photos`, file, 'photo');
  }

  async deletePhoto(inspectionId: number | string, itemId: string, photoId: string): Promise<void> {
    return this.http.delete(`/inspections/${inspectionId}/items/${itemId}/photos/${photoId}`);
  }
}
