import { HttpClient } from '../http/client';

export interface HmoTenantAssignment {
  tenant_ids?: string[];
  is_shared?: boolean;
  room_identifier?: string | null;
}

export interface HmoBulkAssignment {
  assignments: Array<{
    area_id: string;
    tenant_ids?: string[];
    is_shared?: boolean;
    room_identifier?: string | null;
  }>;
}

export class Hmo {
  constructor(private http: HttpClient) {}

  async summary(inspectionId: number | string): Promise<any> {
    return this.http.get(`/inspections/${inspectionId}/hmo/summary`);
  }

  async tenants(inspectionId: number | string): Promise<any> {
    return this.http.get(`/inspections/${inspectionId}/hmo/tenants`);
  }

  async assignTenantToArea(
    inspectionId: number | string,
    areaId: string,
    data: HmoTenantAssignment,
  ): Promise<any> {
    return this.http.put(`/inspections/${inspectionId}/hmo/areas/${areaId}/assign`, data);
  }

  async bulkAssignTenants(inspectionId: number | string, data: HmoBulkAssignment): Promise<any> {
    return this.http.post(`/inspections/${inspectionId}/hmo/bulk-assign`, data);
  }
}
