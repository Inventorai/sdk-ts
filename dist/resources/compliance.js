"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compliance = void 0;
class Compliance {
    constructor(http) {
        this.http = http;
    }
    async list(inspectionId) {
        return this.http.get(`/inspections/${inspectionId}/compliance`);
    }
    async attach(inspectionId, formId) {
        return this.http.post(`/inspections/${inspectionId}/compliance/attach`, { form_id: formId });
    }
    async attachMultiple(inspectionId, formIds) {
        return this.http.post(`/inspections/${inspectionId}/compliance/attach-multiple`, { form_ids: formIds });
    }
    async updateResponse(inspectionId, fieldId, data) {
        return this.http.patch(`/inspections/${inspectionId}/compliance/fields/${fieldId}`, data);
    }
    async batchUpdateResponses(inspectionId, fields) {
        return this.http.post(`/inspections/${inspectionId}/compliance/batch`, { fields });
    }
    async uploadFile(inspectionId, file) {
        return this.http.upload(`/inspections/${inspectionId}/compliance/upload`, file, 'file');
    }
    async addSectionInstance(inspectionId, data) {
        return this.http.post(`/inspections/${inspectionId}/compliance/section-instance`, data);
    }
    async removeSectionInstance(inspectionId, instanceId) {
        return this.http.delete(`/inspections/${inspectionId}/compliance/section-instance/${instanceId}`);
    }
    async summary(inspectionId) {
        return this.http.get(`/inspections/${inspectionId}/compliance/summary`);
    }
    async update(inspectionId, formId, data) {
        return this.http.patch(`/inspections/${inspectionId}/compliance-forms/${formId}`, data);
    }
    async detach(inspectionId, formId) {
        return this.http.delete(`/inspections/${inspectionId}/compliance-forms/${formId}`);
    }
}
exports.Compliance = Compliance;
