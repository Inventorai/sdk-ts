import { HttpClient } from '../http/client';
import { ComplianceForm } from '../types';
export declare class Compliance {
    private http;
    constructor(http: HttpClient);
    list(inspectionId: number | string): Promise<{
        data: ComplianceForm[];
    }>;
    attach(inspectionId: number | string, formId: string | number): Promise<any>;
    attachMultiple(inspectionId: number | string, formIds: (string | number)[]): Promise<any>;
    updateResponse(inspectionId: number | string, fieldId: number | string, data: {
        value: any;
        section_instance?: number;
    }): Promise<any>;
    batchUpdateResponses(inspectionId: number | string, fields: Record<string, any>): Promise<any>;
    uploadFile(inspectionId: number | string, file: File | Blob | Buffer): Promise<any>;
    addSectionInstance(inspectionId: number | string, data: {
        form_id: number;
        section_id: number;
    }): Promise<any>;
    removeSectionInstance(inspectionId: number | string, instanceId: number | string): Promise<void>;
    summary(inspectionId: number | string): Promise<any>;
    update(inspectionId: number | string, formId: number | string, data: any): Promise<any>;
    detach(inspectionId: number | string, formId: number | string): Promise<void>;
}
//# sourceMappingURL=compliance.d.ts.map