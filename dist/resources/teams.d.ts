import { HttpClient } from '../http/client';
import { Team } from '../types';
export declare class Teams {
    private http;
    constructor(http: HttpClient);
    list(): Promise<{
        data: Team[];
    }>;
    current(): Promise<{
        data: Team;
    }>;
    switch(teamId: number): Promise<{
        data: Team;
    }>;
}
//# sourceMappingURL=teams.d.ts.map