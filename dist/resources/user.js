"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResource = void 0;
class UserResource {
    constructor(http) {
        this.http = http;
    }
    async me() {
        return this.http.get('/user');
    }
}
exports.UserResource = UserResource;
