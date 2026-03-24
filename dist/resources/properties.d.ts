import { HttpClient } from '../http/client';
import { Property, CreatePropertyData, PaginatedResponse, ListParams } from '../types';
export declare class Properties {
    private http;
    constructor(http: HttpClient);
    list(params?: ListParams): Promise<PaginatedResponse<Property>>;
    get(id: number | string, params?: {
        include?: string | string[];
    }): Promise<{
        data: Property;
    }>;
    create(data: CreatePropertyData): Promise<{
        data: Property;
    }>;
    activeTenancy(propertyId: number | string): Promise<{
        data: any;
    }>;
    uploadCoverImage(propertyId: number | string, file: File | Blob | Buffer): Promise<any>;
    deleteCoverImage(propertyId: number | string): Promise<void>;
}
//# sourceMappingURL=properties.d.ts.map