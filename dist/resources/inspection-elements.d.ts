import { HttpClient } from '../http/client';
import { InspectionElement, CreateInspectionElementData, UpdateInspectionElementData, PaginatedResponse, ListParams } from '../types';
export declare class InspectionElements {
    private http;
    constructor(http: HttpClient);
    list(inspectionId: number | string, params?: ListParams): Promise<PaginatedResponse<InspectionElement>>;
    get(inspectionId: number | string, elementId: string, params?: {
        include?: string | string[];
    }): Promise<{
        data: InspectionElement;
    }>;
    create(inspectionId: number | string, data: CreateInspectionElementData): Promise<{
        data: InspectionElement;
    }>;
    update(inspectionId: number | string, elementId: string, data: UpdateInspectionElementData): Promise<{
        data: InspectionElement;
    }>;
    delete(inspectionId: number | string, elementId: string): Promise<void>;
    duplicate(inspectionId: number | string, elementId: string): Promise<{
        data: InspectionElement;
    }>;
    uploadPhoto(inspectionId: number | string, elementId: string, file: File | Blob | Buffer): Promise<any>;
    deletePhoto(inspectionId: number | string, elementId: string, photoId: string): Promise<void>;
}
//# sourceMappingURL=inspection-elements.d.ts.map