"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeysFobs = void 0;
class KeysFobs {
    constructor(http) {
        this.http = http;
    }
    async list(inspectionId, params = {}) {
        return this.http.get(`/inspections/${inspectionId}/keys-fobs`, params);
    }
    async get(inspectionId, keyFobId) {
        return this.http.get(`/inspections/${inspectionId}/keys-fobs/${keyFobId}`);
    }
    async create(inspectionId, data) {
        return this.http.post(`/inspections/${inspectionId}/keys-fobs`, data);
    }
    async update(inspectionId, keyFobId, data) {
        return this.http.patch(`/inspections/${inspectionId}/keys-fobs/${keyFobId}`, data);
    }
    async delete(inspectionId, keyFobId) {
        return this.http.delete(`/inspections/${inspectionId}/keys-fobs/${keyFobId}`);
    }
    async uploadPhoto(inspectionId, keyFobId, file) {
        return this.http.upload(`/inspections/${inspectionId}/keys-fobs/${keyFobId}/photos`, file, 'photo');
    }
    async deletePhoto(inspectionId, keyFobId, photoId) {
        return this.http.delete(`/inspections/${inspectionId}/keys-fobs/${keyFobId}/photos/${photoId}`);
    }
}
exports.KeysFobs = KeysFobs;
