import { HttpClient } from '../http/client';
import { ComplianceForm } from '../types';

export class Compliance {
  constructor(private http: HttpClient) {}

  async list(inspectionId: number | string): Promise<{ data: ComplianceForm[] }> {
    return this.http.get(`/inspections/${inspectionId}/compliance`);
  }

  async attach(inspectionId: number | string, formId: string | number): Promise<any> {
    return this.http.post(`/inspections/${inspectionId}/compliance/attach`, { form_id: formId });
  }

  async attachMultiple(inspectionId: number | string, formIds: (string | number)[]): Promise<any> {
    return this.http.post(`/inspections/${inspectionId}/compliance/attach-multiple`, { form_ids: formIds });
  }

  async updateResponse(inspectionId: number | string, fieldId: number | string, data: { value: any; section_instance?: number }): Promise<any> {
    return this.http.patch(`/inspections/${inspectionId}/compliance/fields/${fieldId}`, data);
  }

  async batchUpdateResponses(inspectionId: number | string, fields: Record<string, any>): Promise<any> {
    return this.http.post(`/inspections/${inspectionId}/compliance/batch`, { fields });
  }

  async uploadFile(inspectionId: number | string, file: File | Blob | Buffer): Promise<any> {
    return this.http.upload(`/inspections/${inspectionId}/compliance/upload`, file, 'file');
  }

  async addSectionInstance(inspectionId: number | string, data: { form_id: number; section_id: number }): Promise<any> {
    return this.http.post(`/inspections/${inspectionId}/compliance/section-instance`, data);
  }

  async removeSectionInstance(inspectionId: number | string, instanceId: number | string): Promise<void> {
    return this.http.delete(`/inspections/${inspectionId}/compliance/section-instance/${instanceId}`);
  }

  async summary(inspectionId: number | string): Promise<any> {
    return this.http.get(`/inspections/${inspectionId}/compliance/summary`);
  }

  async update(inspectionId: number | string, formId: number | string, data: any): Promise<any> {
    return this.http.patch(`/inspections/${inspectionId}/compliance-forms/${formId}`, data);
  }

  async detach(inspectionId: number | string, formId: number | string): Promise<void> {
    return this.http.delete(`/inspections/${inspectionId}/compliance-forms/${formId}`);
  }
}
