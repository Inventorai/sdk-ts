import { HttpClient } from '../http/client';
import { KeyFob, CreateKeyFobData, UpdateKeyFobData, PaginatedResponse, ListParams } from '../types';

export class KeysFobs {
  constructor(private http: HttpClient) {}

  async list(inspectionId: number | string, params: ListParams = {}): Promise<PaginatedResponse<KeyFob>> {
    return this.http.get(`/inspections/${inspectionId}/keys-fobs`, params);
  }

  async get(inspectionId: number | string, keyFobId: string): Promise<{ data: KeyFob }> {
    return this.http.get(`/inspections/${inspectionId}/keys-fobs/${keyFobId}`);
  }

  async create(inspectionId: number | string, data: CreateKeyFobData): Promise<{ data: KeyFob }> {
    return this.http.post(`/inspections/${inspectionId}/keys-fobs`, data);
  }

  async update(inspectionId: number | string, keyFobId: string, data: UpdateKeyFobData): Promise<{ data: KeyFob }> {
    return this.http.patch(`/inspections/${inspectionId}/keys-fobs/${keyFobId}`, data);
  }

  async delete(inspectionId: number | string, keyFobId: string): Promise<void> {
    return this.http.delete(`/inspections/${inspectionId}/keys-fobs/${keyFobId}`);
  }

  async uploadPhoto(inspectionId: number | string, keyFobId: string, file: File | Blob | Buffer): Promise<any> {
    return this.http.upload(`/inspections/${inspectionId}/keys-fobs/${keyFobId}/photos`, file, 'photo');
  }

  async deletePhoto(inspectionId: number | string, keyFobId: string, photoId: string): Promise<void> {
    return this.http.delete(`/inspections/${inspectionId}/keys-fobs/${keyFobId}/photos/${photoId}`);
  }
}
