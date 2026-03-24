"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Properties = void 0;
class Properties {
    constructor(http) {
        this.http = http;
    }
    async list(params = {}) {
        return this.http.get('/properties', params);
    }
    async get(id, params = {}) {
        const query = params.include
            ? { include: Array.isArray(params.include) ? params.include.join(',') : params.include }
            : {};
        return this.http.get(`/properties/${id}`, query);
    }
    async create(data) {
        return this.http.post('/properties', data);
    }
    async activeTenancy(propertyId) {
        return this.http.get(`/properties/${propertyId}/active-tenancy`);
    }
    async uploadCoverImage(propertyId, file) {
        return this.http.upload(`/properties/${propertyId}/cover-image`, file, 'cover_image');
    }
    async deleteCoverImage(propertyId) {
        return this.http.delete(`/properties/${propertyId}/cover-image`);
    }
}
exports.Properties = Properties;
