export declare class ApiError extends Error {
    statusCode?: number | undefined;
    response?: any | undefined;
    constructor(message: string, statusCode?: number | undefined, response?: any | undefined);
}
export declare class AuthenticationError extends ApiError {
    constructor(message: string, statusCode?: number, response?: any);
}
export declare class RateLimitError extends ApiError {
    constructor(message: string, statusCode?: number, response?: any);
}
//# sourceMappingURL=api-error.d.ts.map