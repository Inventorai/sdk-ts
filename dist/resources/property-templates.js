"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyTemplates = void 0;
class PropertyTemplates {
    constructor(http) {
        this.http = http;
    }
    async list(params = {}) {
        return this.http.get('/property-templates', params);
    }
    async get(id) {
        return this.http.get(`/property-templates/${id}`);
    }
}
exports.PropertyTemplates = PropertyTemplates;
