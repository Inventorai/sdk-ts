"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Phrases = void 0;
class Phrases {
    constructor(http) {
        this.http = http;
    }
    async sync() {
        return this.http.get('/phrases/sync');
    }
    async search(params) {
        return this.http.get('/phrases/search', params);
    }
    async create(data) {
        return this.http.post('/phrases', data);
    }
    async generate(data) {
        return this.http.post('/phrases/generate', data);
    }
    async learn(data) {
        return this.http.post('/phrases/learn', data);
    }
    async stats() {
        return this.http.get('/phrases/stats');
    }
}
exports.Phrases = Phrases;
