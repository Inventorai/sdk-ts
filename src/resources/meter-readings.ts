import { HttpClient } from '../http/client';
import { MeterReading, CreateMeterReadingData, UpdateMeterReadingData, PaginatedResponse, ListParams } from '../types';

export class MeterReadings {
  constructor(private http: HttpClient) {}

  async list(inspectionId: number | string, params: ListParams = {}): Promise<PaginatedResponse<MeterReading>> {
    return this.http.get(`/inspections/${inspectionId}/meter-readings`, params);
  }

  async get(inspectionId: number | string, meterReadingId: string): Promise<{ data: MeterReading }> {
    return this.http.get(`/inspections/${inspectionId}/meter-readings/${meterReadingId}`);
  }

  async create(inspectionId: number | string, data: CreateMeterReadingData): Promise<{ data: MeterReading }> {
    return this.http.post(`/inspections/${inspectionId}/meter-readings`, data);
  }

  async update(inspectionId: number | string, meterReadingId: string, data: UpdateMeterReadingData): Promise<{ data: MeterReading }> {
    return this.http.patch(`/inspections/${inspectionId}/meter-readings/${meterReadingId}`, data);
  }

  async delete(inspectionId: number | string, meterReadingId: string): Promise<void> {
    return this.http.delete(`/inspections/${inspectionId}/meter-readings/${meterReadingId}`);
  }

  async uploadPhoto(inspectionId: number | string, meterReadingId: string, file: File | Blob | Buffer): Promise<any> {
    return this.http.upload(`/inspections/${inspectionId}/meter-readings/${meterReadingId}/photos`, file, 'photo');
  }

  async deletePhoto(inspectionId: number | string, meterReadingId: string, photoId: string): Promise<void> {
    return this.http.delete(`/inspections/${inspectionId}/meter-readings/${meterReadingId}/photos/${photoId}`);
  }
}
