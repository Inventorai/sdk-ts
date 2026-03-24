"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Defects = void 0;
class Defects {
    constructor(http) {
        this.http = http;
    }
    async list(inspectionId, params = {}) {
        return this.http.get(`/inspections/${inspectionId}/defects`, params);
    }
    async get(inspectionId, defectId) {
        return this.http.get(`/inspections/${inspectionId}/defects/${defectId}`);
    }
    async create(inspectionId, data) {
        return this.http.post(`/inspections/${inspectionId}/defects`, data);
    }
    async createForArea(inspectionId, areaId, data) {
        return this.http.post(`/inspections/${inspectionId}/areas/${areaId}/defects`, data);
    }
    async createForItem(inspectionId, itemId, data) {
        return this.http.post(`/inspections/${inspectionId}/items/${itemId}/defects`, data);
    }
    async createForElement(inspectionId, elementId, data) {
        return this.http.post(`/inspections/${inspectionId}/elements/${elementId}/defects`, data);
    }
    async update(inspectionId, defectId, data) {
        return this.http.patch(`/inspections/${inspectionId}/defects/${defectId}`, data);
    }
    async delete(inspectionId, defectId) {
        return this.http.delete(`/inspections/${inspectionId}/defects/${defectId}`);
    }
    async uploadPhoto(inspectionId, defectId, file) {
        return this.http.upload(`/inspections/${inspectionId}/defects/${defectId}/photos`, file, 'photo');
    }
    async deletePhoto(inspectionId, defectId, photoId) {
        return this.http.delete(`/inspections/${inspectionId}/defects/${defectId}/photos/${photoId}`);
    }
}
exports.Defects = Defects;
