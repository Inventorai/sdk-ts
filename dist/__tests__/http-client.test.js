"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const client_1 = require("../http/client");
const api_error_1 = require("../errors/api-error");
jest.mock('axios');
const mockedAxios = axios_1.default;
describe('HttpClient', () => {
    let httpClient;
    let mockAxiosInstance;
    beforeEach(() => {
        // Capture the interceptor callback so we can test it
        const interceptors = {
            response: { use: jest.fn() },
        };
        mockAxiosInstance = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            patch: jest.fn(),
            delete: jest.fn(),
            interceptors,
        };
        mockedAxios.create.mockReturnValue(mockAxiosInstance);
        httpClient = new client_1.HttpClient('test-token');
    });
    describe('constructor', () => {
        it('creates an axios instance with default baseURL', () => {
            expect(mockedAxios.create).toHaveBeenCalledWith(expect.objectContaining({
                baseURL: 'https://app.inventorai.co.uk/api/v1',
                headers: expect.objectContaining({
                    Authorization: 'Bearer test-token',
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }),
                timeout: 30000,
            }));
        });
        it('creates an axios instance with custom baseURL', () => {
            new client_1.HttpClient('test-token', 'https://custom.api.com');
            expect(mockedAxios.create).toHaveBeenCalledWith(expect.objectContaining({
                baseURL: 'https://custom.api.com',
            }));
        });
        it('registers a response interceptor', () => {
            expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalledWith(expect.any(Function), expect.any(Function));
        });
    });
    describe('get', () => {
        it('calls axios get with endpoint and params', async () => {
            mockAxiosInstance.get.mockResolvedValue({ data: { id: 1 } });
            const result = await httpClient.get('/test', { page: 1 });
            expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test', { params: { page: 1 } });
            expect(result).toEqual({ id: 1 });
        });
        it('calls axios get without params', async () => {
            mockAxiosInstance.get.mockResolvedValue({ data: [] });
            await httpClient.get('/test');
            expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test', { params: undefined });
        });
    });
    describe('post', () => {
        it('calls axios post with endpoint and data', async () => {
            mockAxiosInstance.post.mockResolvedValue({ data: { id: 1 } });
            const result = await httpClient.post('/test', { name: 'test' });
            expect(mockAxiosInstance.post).toHaveBeenCalledWith('/test', { name: 'test' });
            expect(result).toEqual({ id: 1 });
        });
        it('calls axios post without data', async () => {
            mockAxiosInstance.post.mockResolvedValue({ data: {} });
            await httpClient.post('/test');
            expect(mockAxiosInstance.post).toHaveBeenCalledWith('/test', undefined);
        });
    });
    describe('put', () => {
        it('calls axios put with endpoint and data', async () => {
            mockAxiosInstance.put.mockResolvedValue({ data: { id: 1 } });
            const result = await httpClient.put('/test', { name: 'updated' });
            expect(mockAxiosInstance.put).toHaveBeenCalledWith('/test', { name: 'updated' });
            expect(result).toEqual({ id: 1 });
        });
    });
    describe('patch', () => {
        it('calls axios patch with endpoint and data', async () => {
            mockAxiosInstance.patch.mockResolvedValue({ data: { id: 1 } });
            const result = await httpClient.patch('/test', { name: 'patched' });
            expect(mockAxiosInstance.patch).toHaveBeenCalledWith('/test', { name: 'patched' });
            expect(result).toEqual({ id: 1 });
        });
    });
    describe('delete', () => {
        it('calls axios delete with endpoint', async () => {
            mockAxiosInstance.delete.mockResolvedValue({ data: undefined });
            const result = await httpClient.delete('/test');
            expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/test');
            expect(result).toBeUndefined();
        });
    });
    describe('upload', () => {
        it('calls axios post with FormData and multipart headers', async () => {
            const file = Buffer.from('test-file-content');
            mockAxiosInstance.post.mockResolvedValue({ data: { url: 'https://example.com/file.jpg' } });
            const result = await httpClient.upload('/upload', file, 'photo');
            expect(mockAxiosInstance.post).toHaveBeenCalledWith('/upload', expect.any(FormData), { headers: { 'Content-Type': 'multipart/form-data' } });
            expect(result).toEqual({ url: 'https://example.com/file.jpg' });
        });
        it('uses "file" as the default field name', async () => {
            const file = Buffer.from('test-file-content');
            mockAxiosInstance.post.mockResolvedValue({ data: {} });
            await httpClient.upload('/upload', file);
            expect(mockAxiosInstance.post).toHaveBeenCalled();
        });
    });
    describe('buildQuery', () => {
        it('returns empty object for empty params', () => {
            const result = httpClient.buildQuery({});
            expect(result).toEqual({});
        });
        it('builds filter params', () => {
            const result = httpClient.buildQuery({
                filter: { status: 'active', type: 'house' },
            });
            expect(result).toEqual({
                'filter[status]': 'active',
                'filter[type]': 'house',
            });
        });
        it('builds include param from string', () => {
            const result = httpClient.buildQuery({
                include: 'inspections',
            });
            expect(result).toEqual({ include: 'inspections' });
        });
        it('builds include param from array', () => {
            const result = httpClient.buildQuery({
                include: ['inspections', 'tenancies'],
            });
            expect(result).toEqual({ include: 'inspections,tenancies' });
        });
        it('builds sort param', () => {
            const result = httpClient.buildQuery({
                sort: '-created_at',
            });
            expect(result).toEqual({ sort: '-created_at' });
        });
        it('builds per_page param as string', () => {
            const result = httpClient.buildQuery({
                per_page: 25,
            });
            expect(result).toEqual({ per_page: '25' });
        });
        it('builds page param as string', () => {
            const result = httpClient.buildQuery({
                page: 3,
            });
            expect(result).toEqual({ page: '3' });
        });
        it('builds all params together', () => {
            const result = httpClient.buildQuery({
                filter: { status: 'active' },
                include: ['inspections', 'tenancies'],
                sort: '-created_at',
                per_page: 10,
                page: 2,
            });
            expect(result).toEqual({
                'filter[status]': 'active',
                include: 'inspections,tenancies',
                sort: '-created_at',
                per_page: '10',
                page: '2',
            });
        });
    });
    describe('error interceptor', () => {
        let errorHandler;
        beforeEach(() => {
            // Extract the error handler from the interceptor registration
            errorHandler = mockAxiosInstance.interceptors.response.use.mock.calls[0][1];
        });
        it('throws AuthenticationError on 401', () => {
            const error = {
                response: {
                    status: 401,
                    data: { message: 'Unauthenticated' },
                },
                message: 'Request failed',
            };
            expect(() => errorHandler(error)).toThrow(api_error_1.AuthenticationError);
            try {
                errorHandler(error);
            }
            catch (e) {
                expect(e).toBeInstanceOf(api_error_1.AuthenticationError);
                expect(e.message).toBe('Unauthenticated');
                expect(e.statusCode).toBe(401);
            }
        });
        it('throws RateLimitError on 429', () => {
            const error = {
                response: {
                    status: 429,
                    data: { message: 'Too many requests' },
                },
                message: 'Request failed',
            };
            expect(() => errorHandler(error)).toThrow(api_error_1.RateLimitError);
            try {
                errorHandler(error);
            }
            catch (e) {
                expect(e).toBeInstanceOf(api_error_1.RateLimitError);
                expect(e.message).toBe('Too many requests');
                expect(e.statusCode).toBe(429);
            }
        });
        it('throws ApiError on other status codes', () => {
            const error = {
                response: {
                    status: 500,
                    data: { message: 'Internal server error' },
                },
                message: 'Request failed',
            };
            expect(() => errorHandler(error)).toThrow(api_error_1.ApiError);
            try {
                errorHandler(error);
            }
            catch (e) {
                expect(e).toBeInstanceOf(api_error_1.ApiError);
                expect(e.message).toBe('Internal server error');
                expect(e.statusCode).toBe(500);
            }
        });
        it('falls back to error.message when response data has no message', () => {
            const error = {
                response: {
                    status: 422,
                    data: {},
                },
                message: 'Validation failed',
            };
            try {
                errorHandler(error);
            }
            catch (e) {
                expect(e).toBeInstanceOf(api_error_1.ApiError);
                expect(e.message).toBe('Validation failed');
            }
        });
        it('throws ApiError when there is no response object', () => {
            const error = {
                message: 'Network error',
            };
            expect(() => errorHandler(error)).toThrow(api_error_1.ApiError);
            try {
                errorHandler(error);
            }
            catch (e) {
                expect(e).toBeInstanceOf(api_error_1.ApiError);
                expect(e.message).toBe('Network error');
            }
        });
    });
});
