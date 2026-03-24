import { HttpClient } from '../http/client';
export declare class StatsResource {
    private http;
    constructor(http: HttpClient);
    index(): Promise<any>;
    team(): Promise<any>;
    user(): Promise<any>;
    schedule(): Promise<any>;
}
//# sourceMappingURL=stats.d.ts.map