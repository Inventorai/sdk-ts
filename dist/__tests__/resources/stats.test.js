"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stats_1 = require("../../resources/stats");
const client_1 = require("../../http/client");
jest.mock('../../http/client');
describe('StatsResource', () => {
    let stats;
    let mockHttp;
    beforeEach(() => {
        mockHttp = new client_1.HttpClient('test-token');
        mockHttp.get = jest.fn().mockResolvedValue({ data: {} });
        stats = new stats_1.StatsResource(mockHttp);
    });
    describe('index', () => {
        it('calls GET /stats', async () => {
            await stats.index();
            expect(mockHttp.get).toHaveBeenCalledWith('/stats');
        });
    });
    describe('team', () => {
        it('calls GET /stats/team', async () => {
            await stats.team();
            expect(mockHttp.get).toHaveBeenCalledWith('/stats/team');
        });
    });
    describe('user', () => {
        it('calls GET /stats/user', async () => {
            await stats.user();
            expect(mockHttp.get).toHaveBeenCalledWith('/stats/user');
        });
    });
    describe('schedule', () => {
        it('calls GET /dashboard/schedule', async () => {
            await stats.schedule();
            expect(mockHttp.get).toHaveBeenCalledWith('/dashboard/schedule');
        });
    });
});
