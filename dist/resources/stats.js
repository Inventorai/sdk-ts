"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsResource = void 0;
class StatsResource {
    constructor(http) {
        this.http = http;
    }
    async index() {
        return this.http.get('/stats');
    }
    async team() {
        return this.http.get('/stats/team');
    }
    async user() {
        return this.http.get('/stats/user');
    }
    async schedule() {
        return this.http.get('/dashboard/schedule');
    }
}
exports.StatsResource = StatsResource;
