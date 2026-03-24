"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inspections = void 0;
class Inspections {
    constructor(http) {
        this.http = http;
    }
    async list(params = {}) {
        return this.http.get('/inspections', params);
    }
    async get(id, params = {}) {
        const query = params.include
            ? { include: Array.isArray(params.include) ? params.include.join(',') : params.include }
            : {};
        return this.http.get(`/inspections/${id}`, query);
    }
    async create(data) {
        return this.http.post('/inspections', data);
    }
    async checkExisting(params) {
        return this.http.get('/inspections/check-existing', params);
    }
    async comparable(params) {
        return this.http.get('/inspections/comparable', params);
    }
    async begin(inspectionId) {
        return this.http.post(`/inspections/${inspectionId}/begin`);
    }
    async finalize(inspectionId, data = {}) {
        return this.http.post(`/inspections/${inspectionId}/finalize`, data);
    }
    async reschedule(inspectionId, data) {
        return this.http.patch(`/inspections/${inspectionId}/reschedule`, data);
    }
    async uploadCoverImage(inspectionId, file) {
        return this.http.upload(`/inspections/${inspectionId}/cover-image`, file, 'cover_image');
    }
    async deleteCoverImage(inspectionId) {
        return this.http.delete(`/inspections/${inspectionId}/cover-image`);
    }
}
exports.Inspections = Inspections;
