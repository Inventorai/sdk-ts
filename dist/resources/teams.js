"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teams = void 0;
class Teams {
    constructor(http) {
        this.http = http;
    }
    async list() {
        return this.http.get('/teams');
    }
    async current() {
        return this.http.get('/team');
    }
    async switch(teamId) {
        return this.http.post('/team/switch', { team_id: teamId });
    }
}
exports.Teams = Teams;
