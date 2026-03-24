import { HttpClient } from '../http/client';
import { KeyFob, CreateKeyFobData, UpdateKeyFobData, PaginatedResponse, ListParams } from '../types';
export declare class KeysFobs {
    private http;
    constructor(http: HttpClient);
    list(inspectionId: number | string, params?: ListParams): Promise<PaginatedResponse<KeyFob>>;
    get(inspectionId: number | string, keyFobId: string): Promise<{
        data: KeyFob;
    }>;
    create(inspectionId: number | string, data: CreateKeyFobData): Promise<{
        data: KeyFob;
    }>;
    update(inspectionId: number | string, keyFobId: string, data: UpdateKeyFobData): Promise<{
        data: KeyFob;
    }>;
    delete(inspectionId: number | string, keyFobId: string): Promise<void>;
    uploadPhoto(inspectionId: number | string, keyFobId: string, file: File | Blob | Buffer): Promise<any>;
    deletePhoto(inspectionId: number | string, keyFobId: string, photoId: string): Promise<void>;
}
//# sourceMappingURL=keys-fobs.d.ts.map