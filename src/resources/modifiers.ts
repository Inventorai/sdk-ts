import { HttpClient } from '../http/client';
import { Modifier, CreateCustomModifierData } from '../types';

export class Modifiers {
  constructor(private http: HttpClient) {}

  async list(): Promise<{ data: Modifier[] }> {
    return this.http.get('/modifiers');
  }

  async types(): Promise<any> {
    return this.http.get('/modifiers/types');
  }

  async forItem(params: { category?: string; item?: string; item_name?: string }): Promise<{ data: Modifier[] }> {
    return this.http.get('/modifiers/for-item', params);
  }

  async search(params: { q: string; type?: string; category?: string; item_name?: string; limit?: number }): Promise<{ data: Modifier[] }> {
    return this.http.get('/modifiers/search', params);
  }

  async disabled(): Promise<{ data: number[] }> {
    return this.http.get('/modifiers/disabled');
  }

  async master(): Promise<{ data: Modifier[] }> {
    return this.http.get('/modifiers/master');
  }

  async createCustom(data: CreateCustomModifierData): Promise<{ data: Modifier }> {
    return this.http.post('/modifiers/custom', data);
  }

  async deleteCustom(id: number | string): Promise<void> {
    return this.http.delete(`/modifiers/custom/${id}`);
  }

  async disable(id: number | string): Promise<void> {
    return this.http.post(`/modifiers/${id}/disable`);
  }

  async enable(id: number | string): Promise<void> {
    return this.http.post(`/modifiers/${id}/enable`);
  }

  async compose(data: any): Promise<any> {
    return this.http.post('/modifiers/compose', data);
  }

  async sync(params?: Record<string, any>): Promise<any> {
    return this.http.get('/modifiers/sync', params);
  }
}
