import { HttpClient } from '../http/client';
import { PropertyTemplate, PaginatedResponse, ListParams } from '../types';
export declare class PropertyTemplates {
    private http;
    constructor(http: HttpClient);
    list(params?: ListParams): Promise<PaginatedResponse<PropertyTemplate>>;
    get(id: number | string): Promise<{
        data: PropertyTemplate;
    }>;
}
//# sourceMappingURL=property-templates.d.ts.map