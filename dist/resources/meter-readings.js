"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeterReadings = void 0;
class MeterReadings {
    constructor(http) {
        this.http = http;
    }
    async list(inspectionId, params = {}) {
        return this.http.get(`/inspections/${inspectionId}/meter-readings`, params);
    }
    async get(inspectionId, meterReadingId) {
        return this.http.get(`/inspections/${inspectionId}/meter-readings/${meterReadingId}`);
    }
    async create(inspectionId, data) {
        return this.http.post(`/inspections/${inspectionId}/meter-readings`, data);
    }
    async update(inspectionId, meterReadingId, data) {
        return this.http.patch(`/inspections/${inspectionId}/meter-readings/${meterReadingId}`, data);
    }
    async delete(inspectionId, meterReadingId) {
        return this.http.delete(`/inspections/${inspectionId}/meter-readings/${meterReadingId}`);
    }
    async uploadPhoto(inspectionId, meterReadingId, file) {
        return this.http.upload(`/inspections/${inspectionId}/meter-readings/${meterReadingId}/photos`, file, 'photo');
    }
    async deletePhoto(inspectionId, meterReadingId, photoId) {
        return this.http.delete(`/inspections/${inspectionId}/meter-readings/${meterReadingId}/photos/${photoId}`);
    }
}
exports.MeterReadings = MeterReadings;
