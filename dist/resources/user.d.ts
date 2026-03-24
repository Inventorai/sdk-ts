import { HttpClient } from '../http/client';
import { User } from '../types';
export declare class UserResource {
    private http;
    constructor(http: HttpClient);
    me(): Promise<{
        data: User;
    }>;
}
//# sourceMappingURL=user.d.ts.map