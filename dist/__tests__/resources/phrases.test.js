"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const phrases_1 = require("../../resources/phrases");
const client_1 = require("../../http/client");
jest.mock('../../http/client');
describe('Phrases', () => {
    let phrases;
    let mockHttp;
    beforeEach(() => {
        mockHttp = new client_1.HttpClient('test-token');
        mockHttp.get = jest.fn().mockResolvedValue({ data: [] });
        mockHttp.post = jest.fn().mockResolvedValue({ data: {} });
        phrases = new phrases_1.Phrases(mockHttp);
    });
    describe('sync', () => {
        it('calls GET /phrases/sync', async () => {
            await phrases.sync();
            expect(mockHttp.get).toHaveBeenCalledWith('/phrases/sync');
        });
    });
    describe('search', () => {
        it('calls GET /phrases/search with query params', async () => {
            const params = { q: 'clean', category: 'area', limit: 10 };
            await phrases.search(params);
            expect(mockHttp.get).toHaveBeenCalledWith('/phrases/search', params);
        });
        it('works with only required q param', async () => {
            await phrases.search({ q: 'good condition' });
            expect(mockHttp.get).toHaveBeenCalledWith('/phrases/search', { q: 'good condition' });
        });
    });
    describe('create', () => {
        it('calls POST /phrases with data', async () => {
            const data = { text: 'In good condition', category: 'item' };
            await phrases.create(data);
            expect(mockHttp.post).toHaveBeenCalledWith('/phrases', data);
        });
    });
    describe('generate', () => {
        it('calls POST /phrases/generate with data', async () => {
            const data = { query: 'kitchen sink', category: 'item', context: 'move_in' };
            await phrases.generate(data);
            expect(mockHttp.post).toHaveBeenCalledWith('/phrases/generate', data);
        });
    });
    describe('learn', () => {
        it('calls POST /phrases/learn with descriptions', async () => {
            const data = { descriptions: ['Clean and tidy', 'Minor wear and tear'] };
            await phrases.learn(data);
            expect(mockHttp.post).toHaveBeenCalledWith('/phrases/learn', data);
        });
    });
    describe('stats', () => {
        it('calls GET /phrases/stats', async () => {
            await phrases.stats();
            expect(mockHttp.get).toHaveBeenCalledWith('/phrases/stats');
        });
    });
});
