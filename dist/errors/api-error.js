"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitError = exports.AuthenticationError = exports.ApiError = void 0;
class ApiError extends Error {
    constructor(message, statusCode, response) {
        super(message);
        this.statusCode = statusCode;
        this.response = response;
        this.name = 'ApiError';
    }
}
exports.ApiError = ApiError;
class AuthenticationError extends ApiError {
    constructor(message, statusCode, response) {
        super(message, statusCode, response);
        this.name = 'AuthenticationError';
    }
}
exports.AuthenticationError = AuthenticationError;
class RateLimitError extends ApiError {
    constructor(message, statusCode, response) {
        super(message, statusCode, response);
        this.name = 'RateLimitError';
    }
}
exports.RateLimitError = RateLimitError;
