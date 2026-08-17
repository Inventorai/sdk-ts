import { HttpClient } from '../http/client';
import { Inspection, CreateInspectionData, RescheduleInspectionData, FinalizeInspectionData, PaginatedResponse, ListParams } from '../types';

export class Inspections {
  constructor(private http: HttpClient) {}

  async list(params: ListParams = {}): Promise<PaginatedResponse<Inspection>> {
    return this.http.get('/inspections', params);
  }

  async get(id: number | string, params: { include?: string | string[] } = {}): Promise<{ data: Inspection }> {
    const query = params.include
      ? { include: Array.isArray(params.include) ? params.include.join(',') : params.include }
      : {};
    return this.http.get(`/inspections/${id}`, query);
  }

  async create(data: CreateInspectionData): Promise<{ data: Inspection }> {
    return this.http.post('/inspections', data);
  }

  async initialize(data: Record<string, any>): Promise<{ data: Inspection }> {
    return this.http.post('/inspections/initialize', data);
  }

  async takeOver(inspectionId: number | string): Promise<{ data: Inspection }> {
    return this.http.post(`/inspections/${inspectionId}/take-over`);
  }

  async takeBackToWeb(inspectionId: number | string): Promise<{ data: Inspection }> {
    return this.http.post(`/inspections/${inspectionId}/take-back-to-web`);
  }

  async checkExisting(params: Record<string, any>): Promise<any> {
    return this.http.get('/inspections/check-existing', params);
  }

  async comparable(params: Record<string, any>): Promise<any> {
    return this.http.get('/inspections/comparable', params);
  }

  async begin(inspectionId: number | string): Promise<{ data: Inspection }> {
    return this.http.post(`/inspections/${inspectionId}/begin`);
  }

  async finalize(inspectionId: number | string, data: FinalizeInspectionData = {}): Promise<{ data: Inspection }> {
    return this.http.post(`/inspections/${inspectionId}/finalize`, data);
  }

  async reschedule(inspectionId: number | string, data: RescheduleInspectionData): Promise<{ data: Inspection }> {
    return this.http.patch(`/inspections/${inspectionId}/reschedule`, data);
  }

  async uploadCoverImage(inspectionId: number | string, file: File | Blob | Buffer): Promise<any> {
    return this.http.upload(`/inspections/${inspectionId}/cover-image`, file, 'cover_image');
  }

  async deleteCoverImage(inspectionId: number | string): Promise<void> {
    return this.http.delete(`/inspections/${inspectionId}/cover-image`);
  }

  async reopen(inspectionId: number | string): Promise<{ data: Inspection }> {
    return this.http.post(`/inspections/${inspectionId}/reopen`);
  }

  async delete(inspectionId: number | string): Promise<void> {
    return this.http.delete(`/inspections/${inspectionId}`);
  }
}
