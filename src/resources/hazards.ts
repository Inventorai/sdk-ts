import { HttpClient } from '../http/client';
import { HazardSync } from '../types';

export class Hazards {
  constructor(private http: HttpClient) {}

  async sync(): Promise<{ success: boolean; data: HazardSync }> {
    return this.http.get('/hazards/sync');
  }
}
