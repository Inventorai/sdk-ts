"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InspectionElements = void 0;
class InspectionElements {
    constructor(http) {
        this.http = http;
    }
    async list(inspectionId, params = {}) {
        return this.http.get(`/inspections/${inspectionId}/elements`, params);
    }
    async get(inspectionId, elementId, params = {}) {
        const query = params.include
            ? { include: Array.isArray(params.include) ? params.include.join(',') : params.include }
            : {};
        return this.http.get(`/inspections/${inspectionId}/elements/${elementId}`, query);
    }
    async create(inspectionId, data) {
        return this.http.post(`/inspections/${inspectionId}/elements`, data);
    }
    async update(inspectionId, elementId, data) {
        return this.http.patch(`/inspections/${inspectionId}/elements/${elementId}`, data);
    }
    async delete(inspectionId, elementId) {
        return this.http.delete(`/inspections/${inspectionId}/elements/${elementId}`);
    }
    async duplicate(inspectionId, elementId) {
        return this.http.post(`/inspections/${inspectionId}/elements/${elementId}/duplicate`);
    }
    async uploadPhoto(inspectionId, elementId, file) {
        return this.http.upload(`/inspections/${inspectionId}/elements/${elementId}/photos`, file, 'photo');
    }
    async deletePhoto(inspectionId, elementId, photoId) {
        return this.http.delete(`/inspections/${inspectionId}/elements/${elementId}/photos/${photoId}`);
    }
}
exports.InspectionElements = InspectionElements;
