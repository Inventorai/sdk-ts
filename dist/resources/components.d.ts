import { HttpClient } from '../http/client';
import { Component, PaginatedResponse, ListParams } from '../types';
export declare class Components {
    private http;
    constructor(http: HttpClient);
    list(params?: ListParams): Promise<PaginatedResponse<Component>>;
}
//# sourceMappingURL=components.d.ts.map