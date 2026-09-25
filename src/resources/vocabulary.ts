import { HttpClient } from '../http/client';
import { VocabularySync } from '../types';

export class Vocabulary {
  constructor(private http: HttpClient) {}

  async sync(): Promise<{ success: boolean; data: VocabularySync }> {
    return this.http.get('/vocabulary/sync');
  }
}
