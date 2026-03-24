import { ListParams } from '../types';
export declare class HttpClient {
    private client;
    constructor(apiToken: string, baseURL?: string);
    get<T>(endpoint: string, params?: Record<string, any>): Promise<T>;
    post<T>(endpoint: string, data?: any): Promise<T>;
    put<T>(endpoint: string, data?: any): Promise<T>;
    patch<T>(endpoint: string, data?: any): Promise<T>;
    delete<T>(endpoint: string): Promise<T>;
    upload<T>(endpoint: string, file: File | Blob | Buffer, fieldName?: string): Promise<T>;
    buildQuery(params: ListParams): Record<string, string>;
}
//# sourceMappingURL=client.d.ts.map