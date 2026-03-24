import { HttpClient } from '../http/client';
import { AiStatus } from '../types';
export declare class InspectionAi {
    private http;
    constructor(http: HttpClient);
    enable(inspectionId: number | string): Promise<any>;
    disable(inspectionId: number | string): Promise<any>;
    status(inspectionId: number | string): Promise<{
        data: AiStatus;
    }>;
    retryCredits(inspectionId: number | string): Promise<any>;
    requestRetry(inspectionId: number | string): Promise<any>;
    retryStatus(inspectionId: number | string): Promise<any>;
    submitFeedback(inspectionId: number | string, data: any): Promise<any>;
}
//# sourceMappingURL=inspection-ai.d.ts.map