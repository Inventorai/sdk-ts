import { HttpClient } from '../http/client';
import { Defect, CreateDefectData, UpdateDefectData, PaginatedResponse, ListParams } from '../types';

export class Defects {
  constructor(private http: HttpClient) {}

  async list(inspectionId: number | string, params: ListParams = {}): Promise<PaginatedResponse<Defect>> {
    return this.http.get(`/inspections/${inspectionId}/defects`, params);
  }

  async get(inspectionId: number | string, defectId: string): Promise<{ data: Defect }> {
    return this.http.get(`/inspections/${inspectionId}/defects/${defectId}`);
  }

  async create(inspectionId: number | string, data: CreateDefectData): Promise<{ data: Defect }> {
    return this.http.post(`/inspections/${inspectionId}/defects`, data);
  }

  async createForArea(inspectionId: number | string, areaId: string, data: Omit<CreateDefectData, 'defectable_type' | 'defectable_id'>): Promise<{ data: Defect }> {
    return this.http.post(`/inspections/${inspectionId}/areas/${areaId}/defects`, data);
  }

  async createForItem(inspectionId: number | string, itemId: string, data: Omit<CreateDefectData, 'defectable_type' | 'defectable_id'>): Promise<{ data: Defect }> {
    return this.http.post(`/inspections/${inspectionId}/items/${itemId}/defects`, data);
  }

  async createForElement(inspectionId: number | string, elementId: string, data: Omit<CreateDefectData, 'defectable_type' | 'defectable_id'>): Promise<{ data: Defect }> {
    return this.http.post(`/inspections/${inspectionId}/elements/${elementId}/defects`, data);
  }

  async update(inspectionId: number | string, defectId: string, data: UpdateDefectData): Promise<{ data: Defect }> {
    return this.http.patch(`/inspections/${inspectionId}/defects/${defectId}`, data);
  }

  async delete(inspectionId: number | string, defectId: string): Promise<void> {
    return this.http.delete(`/inspections/${inspectionId}/defects/${defectId}`);
  }

  async uploadPhoto(inspectionId: number | string, defectId: string, file: File | Blob | Buffer): Promise<any> {
    return this.http.upload(`/inspections/${inspectionId}/defects/${defectId}/photos`, file, 'photo');
  }

  async deletePhoto(inspectionId: number | string, defectId: string, photoId: string): Promise<void> {
    return this.http.delete(`/inspections/${inspectionId}/defects/${defectId}/photos/${photoId}`);
  }
}
