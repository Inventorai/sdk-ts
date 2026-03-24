"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modifiers = void 0;
class Modifiers {
    constructor(http) {
        this.http = http;
    }
    async list() {
        return this.http.get('/modifiers');
    }
    async types() {
        return this.http.get('/modifiers/types');
    }
    async forItem(params) {
        return this.http.get('/modifiers/for-item', params);
    }
    async search(params) {
        return this.http.get('/modifiers/search', params);
    }
    async disabled() {
        return this.http.get('/modifiers/disabled');
    }
    async master() {
        return this.http.get('/modifiers/master');
    }
    async createCustom(data) {
        return this.http.post('/modifiers/custom', data);
    }
    async deleteCustom(id) {
        return this.http.delete(`/modifiers/custom/${id}`);
    }
    async disable(id) {
        return this.http.post(`/modifiers/${id}/disable`);
    }
    async enable(id) {
        return this.http.post(`/modifiers/${id}/enable`);
    }
    async compose(data) {
        return this.http.post('/modifiers/compose', data);
    }
}
exports.Modifiers = Modifiers;
