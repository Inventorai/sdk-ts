import { HttpClient } from '../http/client';
import { Inspection, CreateInspectionData, RescheduleInspectionData, FinalizeInspectionData, PaginatedResponse, ListParams } from '../types';
export declare class Inspections {
    private http;
    constructor(http: HttpClient);
    list(params?: ListParams): Promise<PaginatedResponse<Inspection>>;
    get(id: number | string, params?: {
        include?: string | string[];
    }): Promise<{
        data: Inspection;
    }>;
    create(data: CreateInspectionData): Promise<{
        data: Inspection;
    }>;
    checkExisting(params: Record<string, any>): Promise<any>;
    comparable(params: Record<string, any>): Promise<any>;
    begin(inspectionId: number | string): Promise<{
        data: Inspection;
    }>;
    finalize(inspectionId: number | string, data?: FinalizeInspectionData): Promise<{
        data: Inspection;
    }>;
    reschedule(inspectionId: number | string, data: RescheduleInspectionData): Promise<{
        data: Inspection;
    }>;
    uploadCoverImage(inspectionId: number | string, file: File | Blob | Buffer): Promise<any>;
    deleteCoverImage(inspectionId: number | string): Promise<void>;
}
//# sourceMappingURL=inspections.d.ts.map