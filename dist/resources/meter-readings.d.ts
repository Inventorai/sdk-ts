import { HttpClient } from '../http/client';
import { MeterReading, CreateMeterReadingData, UpdateMeterReadingData, PaginatedResponse, ListParams } from '../types';
export declare class MeterReadings {
    private http;
    constructor(http: HttpClient);
    list(inspectionId: number | string, params?: ListParams): Promise<PaginatedResponse<MeterReading>>;
    get(inspectionId: number | string, meterReadingId: string): Promise<{
        data: MeterReading;
    }>;
    create(inspectionId: number | string, data: CreateMeterReadingData): Promise<{
        data: MeterReading;
    }>;
    update(inspectionId: number | string, meterReadingId: string, data: UpdateMeterReadingData): Promise<{
        data: MeterReading;
    }>;
    delete(inspectionId: number | string, meterReadingId: string): Promise<void>;
    uploadPhoto(inspectionId: number | string, meterReadingId: string, file: File | Blob | Buffer): Promise<any>;
    deletePhoto(inspectionId: number | string, meterReadingId: string, photoId: string): Promise<void>;
}
//# sourceMappingURL=meter-readings.d.ts.map