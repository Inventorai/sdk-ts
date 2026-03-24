import { HttpClient } from '../http/client';
import { Defect, CreateDefectData, UpdateDefectData, PaginatedResponse, ListParams } from '../types';
export declare class Defects {
    private http;
    constructor(http: HttpClient);
    list(inspectionId: number | string, params?: ListParams): Promise<PaginatedResponse<Defect>>;
    get(inspectionId: number | string, defectId: string): Promise<{
        data: Defect;
    }>;
    create(inspectionId: number | string, data: CreateDefectData): Promise<{
        data: Defect;
    }>;
    createForArea(inspectionId: number | string, areaId: string, data: Omit<CreateDefectData, 'defectable_type' | 'defectable_id'>): Promise<{
        data: Defect;
    }>;
    createForItem(inspectionId: number | string, itemId: string, data: Omit<CreateDefectData, 'defectable_type' | 'defectable_id'>): Promise<{
        data: Defect;
    }>;
    createForElement(inspectionId: number | string, elementId: string, data: Omit<CreateDefectData, 'defectable_type' | 'defectable_id'>): Promise<{
        data: Defect;
    }>;
    update(inspectionId: number | string, defectId: string, data: UpdateDefectData): Promise<{
        data: Defect;
    }>;
    delete(inspectionId: number | string, defectId: string): Promise<void>;
    uploadPhoto(inspectionId: number | string, defectId: string, file: File | Blob | Buffer): Promise<any>;
    deletePhoto(inspectionId: number | string, defectId: string, photoId: string): Promise<void>;
}
//# sourceMappingURL=defects.d.ts.map