import { HttpClient } from '../http/client';
import { AddressLookupResult, AddressResult } from '../types';
export declare class AddressLookup {
    private http;
    constructor(http: HttpClient);
    lookup(postcode: string): Promise<{
        data: AddressLookupResult;
    }>;
    bulkLookup(postcodes: string[]): Promise<any>;
    getDetails(data: Record<string, any>): Promise<{
        data: AddressResult;
    }>;
    usage(): Promise<any>;
}
//# sourceMappingURL=address-lookup.d.ts.map