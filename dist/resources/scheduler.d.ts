import { HttpClient } from '../http/client';
export declare class Scheduler {
    private http;
    constructor(http: HttpClient);
    calendar(params?: Record<string, any>): Promise<any>;
    weeklyAvailability(data: any): Promise<any>;
    checkConflicts(data: any): Promise<any>;
    officeHours(): Promise<any>;
    estimateDuration(data: any): Promise<any>;
}
//# sourceMappingURL=scheduler.d.ts.map