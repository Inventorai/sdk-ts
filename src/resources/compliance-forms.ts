import { HttpClient } from '../http/client';
import { ComplianceForm, PaginatedResponse, ListParams } from '../types';

export class ComplianceForms {
  constructor(private http: HttpClient) {}

  async list(params: ListParams = {}): Promise<PaginatedResponse<ComplianceForm>> {
    return this.http.get('/compliance-forms', params);
  }
}
