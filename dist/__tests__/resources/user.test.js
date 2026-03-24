"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../resources/user");
const client_1 = require("../../http/client");
jest.mock('../../http/client');
describe('UserResource', () => {
    let user;
    let mockHttp;
    beforeEach(() => {
        mockHttp = new client_1.HttpClient('test-token');
        mockHttp.get = jest.fn().mockResolvedValue({ data: { id: 1, email: 'test@example.com' } });
        user = new user_1.UserResource(mockHttp);
    });
    describe('me', () => {
        it('calls GET /user', async () => {
            const result = await user.me();
            expect(mockHttp.get).toHaveBeenCalledWith('/user');
            expect(result).toEqual({ data: { id: 1, email: 'test@example.com' } });
        });
    });
});
