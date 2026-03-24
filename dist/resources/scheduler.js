"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scheduler = void 0;
class Scheduler {
    constructor(http) {
        this.http = http;
    }
    async calendar(params = {}) {
        return this.http.get('/inspections/scheduler/calendar', params);
    }
    async weeklyAvailability(data) {
        return this.http.post('/inspections/scheduler/availability/weekly', data);
    }
    async checkConflicts(data) {
        return this.http.post('/inspections/scheduler/availability/check-conflicts', data);
    }
    async officeHours() {
        return this.http.get('/inspections/scheduler/office-hours');
    }
    async estimateDuration(data) {
        return this.http.post('/inspections/scheduler/estimate-duration', data);
    }
}
exports.Scheduler = Scheduler;
