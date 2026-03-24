import { HttpClient } from '../http/client';
import { Phrase, CreatePhraseData, PhraseCategory } from '../types';

export class Phrases {
  constructor(private http: HttpClient) {}

  async sync(): Promise<any> {
    return this.http.get('/phrases/sync');
  }

  async search(params: { q: string; category?: PhraseCategory; limit?: number }): Promise<{ data: Phrase[] }> {
    return this.http.get('/phrases/search', params);
  }

  async create(data: CreatePhraseData): Promise<{ data: Phrase }> {
    return this.http.post('/phrases', data);
  }

  async generate(data: { query: string; category: PhraseCategory; context?: string }): Promise<any> {
    return this.http.post('/phrases/generate', data);
  }

  async learn(data: { descriptions: string[] }): Promise<any> {
    return this.http.post('/phrases/learn', data);
  }

  async stats(): Promise<any> {
    return this.http.get('/phrases/stats');
  }
}
