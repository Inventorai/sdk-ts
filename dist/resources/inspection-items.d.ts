import { HttpClient } from '../http/client';
import { InspectionItem, CreateInspectionItemData, UpdateInspectionItemData, PaginatedResponse, ListParams } from '../types';
export declare class InspectionItems {
    private http;
    constructor(http: HttpClient);
    list(inspectionId: number | string, params?: ListParams): Promise<PaginatedResponse<InspectionItem>>;
    get(inspectionId: number | string, itemId: string, params?: {
        include?: string | string[];
    }): Promise<{
        data: InspectionItem;
    }>;
    create(inspectionId: number | string, data: CreateInspectionItemData): Promise<{
        data: InspectionItem;
    }>;
    update(inspectionId: number | string, itemId: string, data: UpdateInspectionItemData): Promise<{
        data: InspectionItem;
    }>;
    delete(inspectionId: number | string, itemId: string): Promise<void>;
    duplicate(inspectionId: number | string, itemId: string): Promise<{
        data: InspectionItem;
    }>;
    uploadPhoto(inspectionId: number | string, itemId: string, file: File | Blob | Buffer): Promise<any>;
    deletePhoto(inspectionId: number | string, itemId: string, photoId: string): Promise<void>;
}
//# sourceMappingURL=inspection-items.d.ts.map