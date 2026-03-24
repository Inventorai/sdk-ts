import { HttpClient } from '../http/client';
import { InspectionArea, CreateInspectionAreaData, UpdateInspectionAreaData, PaginatedResponse, ListParams } from '../types';

export class InspectionAreas {
  constructor(private http: HttpClient) {}

  async list(inspectionId: number | string, params: ListParams = {}): Promise<PaginatedResponse<InspectionArea>> {
    return this.http.get(`/inspections/${inspectionId}/areas`, params);
  }

  async get(inspectionId: number | string, areaId: string, params: { include?: string | string[] } = {}): Promise<{ data: InspectionArea }> {
    const query = params.include
      ? { include: Array.isArray(params.include) ? params.include.join(',') : params.include }
      : {};
    return this.http.get(`/inspections/${inspectionId}/areas/${areaId}`, query);
  }

  async create(inspectionId: number | string, data: CreateInspectionAreaData): Promise<{ data: InspectionArea }> {
    return this.http.post(`/inspections/${inspectionId}/areas`, data);
  }

  async update(inspectionId: number | string, areaId: string, data: UpdateInspectionAreaData): Promise<{ data: InspectionArea }> {
    return this.http.patch(`/inspections/${inspectionId}/areas/${areaId}`, data);
  }

  async delete(inspectionId: number | string, areaId: string): Promise<void> {
    return this.http.delete(`/inspections/${inspectionId}/areas/${areaId}`);
  }

  async duplicate(inspectionId: number | string, areaId: string): Promise<{ data: InspectionArea }> {
    return this.http.post(`/inspections/${inspectionId}/areas/${areaId}/duplicate`);
  }

  async reorder(inspectionId: number | string, order: string[]): Promise<void> {
    return this.http.post(`/inspections/${inspectionId}/areas/reorder`, { order });
  }

  async uploadPhoto(inspectionId: number | string, areaId: string, file: File | Blob | Buffer): Promise<any> {
    return this.http.upload(`/inspections/${inspectionId}/areas/${areaId}/photos`, file, 'photo');
  }

  async deletePhoto(inspectionId: number | string, areaId: string, photoId: string): Promise<void> {
    return this.http.delete(`/inspections/${inspectionId}/areas/${areaId}/photos/${photoId}`);
  }
}
