import { HttpClient } from '../http/client';
import { Modifier, CreateCustomModifierData } from '../types';
export declare class Modifiers {
    private http;
    constructor(http: HttpClient);
    list(): Promise<{
        data: Modifier[];
    }>;
    types(): Promise<any>;
    forItem(params: {
        category?: string;
        item?: string;
        item_name?: string;
    }): Promise<{
        data: Modifier[];
    }>;
    search(params: {
        q: string;
        type?: string;
        category?: string;
        item_name?: string;
        limit?: number;
    }): Promise<{
        data: Modifier[];
    }>;
    disabled(): Promise<{
        data: number[];
    }>;
    master(): Promise<{
        data: Modifier[];
    }>;
    createCustom(data: CreateCustomModifierData): Promise<{
        data: Modifier;
    }>;
    deleteCustom(id: number | string): Promise<void>;
    disable(id: number | string): Promise<void>;
    enable(id: number | string): Promise<void>;
    compose(data: any): Promise<any>;
}
//# sourceMappingURL=modifiers.d.ts.map