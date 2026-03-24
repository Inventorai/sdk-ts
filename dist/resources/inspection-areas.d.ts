import { HttpClient } from '../http/client';
import { InspectionArea, CreateInspectionAreaData, UpdateInspectionAreaData, PaginatedResponse, ListParams } from '../types';
export declare class InspectionAreas {
    private http;
    constructor(http: HttpClient);
    list(inspectionId: number | string, params?: ListParams): Promise<PaginatedResponse<InspectionArea>>;
    get(inspectionId: number | string, areaId: string, params?: {
        include?: string | string[];
    }): Promise<{
        data: InspectionArea;
    }>;
    create(inspectionId: number | string, data: CreateInspectionAreaData): Promise<{
        data: InspectionArea;
    }>;
    update(inspectionId: number | string, areaId: string, data: UpdateInspectionAreaData): Promise<{
        data: InspectionArea;
    }>;
    delete(inspectionId: number | string, areaId: string): Promise<void>;
    duplicate(inspectionId: number | string, areaId: string): Promise<{
        data: InspectionArea;
    }>;
    reorder(inspectionId: number | string, order: string[]): Promise<void>;
    uploadPhoto(inspectionId: number | string, areaId: string, file: File | Blob | Buffer): Promise<any>;
    deletePhoto(inspectionId: number | string, areaId: string, photoId: string): Promise<void>;
}
//# sourceMappingURL=inspection-areas.d.ts.map