"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const axios_1 = __importDefault(require("axios"));
const api_error_1 = require("../errors/api-error");
class HttpClient {
    constructor(apiToken, baseURL = 'https://app.inventorai.co.uk/api/v1') {
        this.client = axios_1.default.create({
            baseURL,
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            timeout: 30000,
        });
        // Add response interceptor for error handling
        this.client.interceptors.response.use((response) => response, (error) => {
            if (error.response) {
                const { status, data } = error.response;
                const message = data?.message || error.message;
                switch (status) {
                    case 401:
                        throw new api_error_1.AuthenticationError(message, status, data);
                    case 429:
                        throw new api_error_1.RateLimitError(message, status, data);
                    default:
                        throw new api_error_1.ApiError(message, status, data);
                }
            }
            throw new api_error_1.ApiError(error.message);
        });
    }
    async get(endpoint, params) {
        const response = await this.client.get(endpoint, { params });
        return response.data;
    }
    async post(endpoint, data) {
        const response = await this.client.post(endpoint, data);
        return response.data;
    }
    async put(endpoint, data) {
        const response = await this.client.put(endpoint, data);
        return response.data;
    }
    async patch(endpoint, data) {
        const response = await this.client.patch(endpoint, data);
        return response.data;
    }
    async delete(endpoint) {
        const response = await this.client.delete(endpoint);
        return response.data;
    }
    async upload(endpoint, file, fieldName = 'file') {
        const formData = new FormData();
        formData.append(fieldName, file);
        const response = await this.client.post(endpoint, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    }
    buildQuery(params) {
        const query = {};
        if (params.filter) {
            Object.entries(params.filter).forEach(([key, value]) => {
                query[`filter[${key}]`] = value;
            });
        }
        if (params.include) {
            query.include = Array.isArray(params.include)
                ? params.include.join(',')
                : params.include;
        }
        if (params.sort) {
            query.sort = params.sort;
        }
        if (params.per_page) {
            query.per_page = params.per_page.toString();
        }
        if (params.page) {
            query.page = params.page.toString();
        }
        return query;
    }
}
exports.HttpClient = HttpClient;
