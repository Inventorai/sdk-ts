import { HttpClient } from '../http/client';
import { AiStatus } from '../types';

export class InspectionAi {
  constructor(private http: HttpClient) {}

  async enable(inspectionId: number | string): Promise<any> {
    return this.http.post(`/inspections/${inspectionId}/ai/enable`);
  }

  async disable(inspectionId: number | string): Promise<any> {
    return this.http.post(`/inspections/${inspectionId}/ai/disable`);
  }

  async status(inspectionId: number | string): Promise<{ data: AiStatus }> {
    return this.http.get(`/inspections/${inspectionId}/ai/status`);
  }

  async retryCredits(inspectionId: number | string): Promise<any> {
    return this.http.post(`/inspections/${inspectionId}/ai/retry-credits`);
  }

  async requestRetry(inspectionId: number | string): Promise<any> {
    return this.http.post(`/inspections/${inspectionId}/ai/request-retry`);
  }

  async retryStatus(inspectionId: number | string): Promise<any> {
    return this.http.get(`/inspections/${inspectionId}/ai/retry-status`);
  }

  async submitFeedback(inspectionId: number | string, data: any): Promise<any> {
    return this.http.post(`/inspections/${inspectionId}/ai/feedback`, data);
  }
}
