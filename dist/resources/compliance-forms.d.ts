import { HttpClient } from '../http/client';
import { ComplianceForm, PaginatedResponse, ListParams } from '../types';
export declare class ComplianceForms {
    private http;
    constructor(http: HttpClient);
    list(params?: ListParams): Promise<PaginatedResponse<ComplianceForm>>;
}
//# sourceMappingURL=compliance-forms.d.ts.map