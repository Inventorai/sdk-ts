"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InspectionItems = void 0;
class InspectionItems {
    constructor(http) {
        this.http = http;
    }
    async list(inspectionId, params = {}) {
        return this.http.get(`/inspections/${inspectionId}/items`, params);
    }
    async get(inspectionId, itemId, params = {}) {
        const query = params.include
            ? { include: Array.isArray(params.include) ? params.include.join(',') : params.include }
            : {};
        return this.http.get(`/inspections/${inspectionId}/items/${itemId}`, query);
    }
    async create(inspectionId, data) {
        return this.http.post(`/inspections/${inspectionId}/items`, data);
    }
    async update(inspectionId, itemId, data) {
        return this.http.patch(`/inspections/${inspectionId}/items/${itemId}`, data);
    }
    async delete(inspectionId, itemId) {
        return this.http.delete(`/inspections/${inspectionId}/items/${itemId}`);
    }
    async duplicate(inspectionId, itemId) {
        return this.http.post(`/inspections/${inspectionId}/items/${itemId}/duplicate`);
    }
    async uploadPhoto(inspectionId, itemId, file) {
        return this.http.upload(`/inspections/${inspectionId}/items/${itemId}/photos`, file, 'photo');
    }
    async deletePhoto(inspectionId, itemId, photoId) {
        return this.http.delete(`/inspections/${inspectionId}/items/${itemId}/photos/${photoId}`);
    }
}
exports.InspectionItems = InspectionItems;
