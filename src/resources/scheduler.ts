import { HttpClient } from '../http/client';

export class Scheduler {
  constructor(private http: HttpClient) {}

  async calendar(params: Record<string, any> = {}): Promise<any> {
    return this.http.get('/inspections/scheduler/calendar', params);
  }

  async weeklyAvailability(data: any): Promise<any> {
    return this.http.post('/inspections/scheduler/availability/weekly', data);
  }

  async checkConflicts(data: any): Promise<any> {
    return this.http.post('/inspections/scheduler/availability/check-conflicts', data);
  }

  async officeHours(): Promise<any> {
    return this.http.get('/inspections/scheduler/office-hours');
  }

  async estimateDuration(data: any): Promise<any> {
    return this.http.post('/inspections/scheduler/estimate-duration', data);
  }
}
