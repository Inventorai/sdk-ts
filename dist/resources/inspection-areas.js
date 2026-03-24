"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InspectionAreas = void 0;
class InspectionAreas {
    constructor(http) {
        this.http = http;
    }
    async list(inspectionId, params = {}) {
        return this.http.get(`/inspections/${inspectionId}/areas`, params);
    }
    async get(inspectionId, areaId, params = {}) {
        const query = params.include
            ? { include: Array.isArray(params.include) ? params.include.join(',') : params.include }
            : {};
        return this.http.get(`/inspections/${inspectionId}/areas/${areaId}`, query);
    }
    async create(inspectionId, data) {
        return this.http.post(`/inspections/${inspectionId}/areas`, data);
    }
    async update(inspectionId, areaId, data) {
        return this.http.patch(`/inspections/${inspectionId}/areas/${areaId}`, data);
    }
    async delete(inspectionId, areaId) {
        return this.http.delete(`/inspections/${inspectionId}/areas/${areaId}`);
    }
    async duplicate(inspectionId, areaId) {
        return this.http.post(`/inspections/${inspectionId}/areas/${areaId}/duplicate`);
    }
    async reorder(inspectionId, order) {
        return this.http.post(`/inspections/${inspectionId}/areas/reorder`, { order });
    }
    async uploadPhoto(inspectionId, areaId, file) {
        return this.http.upload(`/inspections/${inspectionId}/areas/${areaId}/photos`, file, 'photo');
    }
    async deletePhoto(inspectionId, areaId, photoId) {
        return this.http.delete(`/inspections/${inspectionId}/areas/${areaId}/photos/${photoId}`);
    }
}
exports.InspectionAreas = InspectionAreas;
