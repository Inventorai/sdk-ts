"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Components = void 0;
class Components {
    constructor(http) {
        this.http = http;
    }
    async list(params = {}) {
        return this.http.get('/components', params);
    }
}
exports.Components = Components;
