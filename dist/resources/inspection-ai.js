"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InspectionAi = void 0;
class InspectionAi {
    constructor(http) {
        this.http = http;
    }
    async enable(inspectionId) {
        return this.http.post(`/inspections/${inspectionId}/ai/enable`);
    }
    async disable(inspectionId) {
        return this.http.post(`/inspections/${inspectionId}/ai/disable`);
    }
    async status(inspectionId) {
        return this.http.get(`/inspections/${inspectionId}/ai/status`);
    }
    async retryCredits(inspectionId) {
        return this.http.post(`/inspections/${inspectionId}/ai/retry-credits`);
    }
    async requestRetry(inspectionId) {
        return this.http.post(`/inspections/${inspectionId}/ai/request-retry`);
    }
    async retryStatus(inspectionId) {
        return this.http.get(`/inspections/${inspectionId}/ai/retry-status`);
    }
    async submitFeedback(inspectionId, data) {
        return this.http.post(`/inspections/${inspectionId}/ai/feedback`, data);
    }
}
exports.InspectionAi = InspectionAi;
