import { HttpClient } from '../http/client';
import { AddressLookupResult, AddressResult } from '../types';

export class AddressLookup {
  constructor(private http: HttpClient) {}

  async lookup(postcode: string): Promise<{ data: AddressLookupResult }> {
    return this.http.post('/address-lookup/lookup', { postcode });
  }

  async bulkLookup(postcodes: string[]): Promise<any> {
    return this.http.post('/address-lookup/bulk-lookup', { postcodes });
  }

  async getDetails(data: Record<string, any>): Promise<{ data: AddressResult }> {
    return this.http.post('/address-lookup/details', data);
  }

  async usage(): Promise<any> {
    return this.http.get('/address-lookup/usage');
  }
}
