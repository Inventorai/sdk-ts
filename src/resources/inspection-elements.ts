import { HttpClient } from '../http/client';
import { InspectionElement, CreateInspectionElementData, UpdateInspectionElementData, PaginatedResponse, ListParams } from '../types';

export class InspectionElements {
  constructor(private http: HttpClient) {}

  async list(inspectionId: number | string, params: ListParams = {}): Promise<PaginatedResponse<InspectionElement>> {
    return this.http.get(`/inspections/${inspectionId}/elements`, params);
  }

  async get(inspectionId: number | string, elementId: string, params: { include?: string | string[] } = {}): Promise<{ data: InspectionElement }> {
    const query = params.include
      ? { include: Array.isArray(params.include) ? params.include.join(',') : params.include }
      : {};
    return this.http.get(`/inspections/${inspectionId}/elements/${elementId}`, query);
  }

  async create(inspectionId: number | string, data: CreateInspectionElementData): Promise<{ data: InspectionElement }> {
    return this.http.post(`/inspections/${inspectionId}/elements`, data);
  }

  async update(inspectionId: number | string, elementId: string, data: UpdateInspectionElementData): Promise<{ data: InspectionElement }> {
    return this.http.patch(`/inspections/${inspectionId}/elements/${elementId}`, data);
  }

  async delete(inspectionId: number | string, elementId: string): Promise<void> {
    return this.http.delete(`/inspections/${inspectionId}/elements/${elementId}`);
  }

  async uploadPhoto(inspectionId: number | string, elementId: string, file: File | Blob | Buffer): Promise<any> {
    return this.http.upload(`/inspections/${inspectionId}/elements/${elementId}/photos`, file, 'photo');
  }

  async deletePhoto(inspectionId: number | string, elementId: string, photoId: string): Promise<void> {
    return this.http.delete(`/inspections/${inspectionId}/elements/${elementId}/photos/${photoId}`);
  }
}
