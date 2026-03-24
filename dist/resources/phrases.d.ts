import { HttpClient } from '../http/client';
import { Phrase, CreatePhraseData, PhraseCategory } from '../types';
export declare class Phrases {
    private http;
    constructor(http: HttpClient);
    sync(): Promise<any>;
    search(params: {
        q: string;
        category?: PhraseCategory;
        limit?: number;
    }): Promise<{
        data: Phrase[];
    }>;
    create(data: CreatePhraseData): Promise<{
        data: Phrase;
    }>;
    generate(data: {
        query: string;
        category: PhraseCategory;
        context?: string;
    }): Promise<any>;
    learn(data: {
        descriptions: string[];
    }): Promise<any>;
    stats(): Promise<any>;
}
//# sourceMappingURL=phrases.d.ts.map