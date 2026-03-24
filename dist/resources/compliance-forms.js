"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplianceForms = void 0;
class ComplianceForms {
    constructor(http) {
        this.http = http;
    }
    async list(params = {}) {
        return this.http.get('/compliance-forms', params);
    }
}
exports.ComplianceForms = ComplianceForms;
