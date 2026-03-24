"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modifiers_1 = require("../../resources/modifiers");
const client_1 = require("../../http/client");
jest.mock('../../http/client');
describe('Modifiers', () => {
    let modifiers;
    let mockHttp;
    beforeEach(() => {
        mockHttp = new client_1.HttpClient('test-token');
        mockHttp.get = jest.fn().mockResolvedValue({ data: [] });
        mockHttp.post = jest.fn().mockResolvedValue({ data: {} });
        mockHttp.delete = jest.fn().mockResolvedValue(undefined);
        modifiers = new modifiers_1.Modifiers(mockHttp);
    });
    describe('list', () => {
        it('calls GET /modifiers', async () => {
            await modifiers.list();
            expect(mockHttp.get).toHaveBeenCalledWith('/modifiers');
        });
    });
    describe('types', () => {
        it('calls GET /modifiers/types', async () => {
            await modifiers.types();
            expect(mockHttp.get).toHaveBeenCalledWith('/modifiers/types');
        });
    });
    describe('forItem', () => {
        it('calls GET /modifiers/for-item with params', async () => {
            const params = { category: 'kitchen', item_name: 'sink' };
            await modifiers.forItem(params);
            expect(mockHttp.get).toHaveBeenCalledWith('/modifiers/for-item', params);
        });
        it('works with empty params', async () => {
            await modifiers.forItem({});
            expect(mockHttp.get).toHaveBeenCalledWith('/modifiers/for-item', {});
        });
    });
    describe('search', () => {
        it('calls GET /modifiers/search with params', async () => {
            const params = { q: 'stainless', type: 'brand', limit: 5 };
            await modifiers.search(params);
            expect(mockHttp.get).toHaveBeenCalledWith('/modifiers/search', params);
        });
        it('works with only required q param', async () => {
            await modifiers.search({ q: 'chrome' });
            expect(mockHttp.get).toHaveBeenCalledWith('/modifiers/search', { q: 'chrome' });
        });
    });
    describe('disabled', () => {
        it('calls GET /modifiers/disabled', async () => {
            await modifiers.disabled();
            expect(mockHttp.get).toHaveBeenCalledWith('/modifiers/disabled');
        });
    });
    describe('master', () => {
        it('calls GET /modifiers/master', async () => {
            await modifiers.master();
            expect(mockHttp.get).toHaveBeenCalledWith('/modifiers/master');
        });
    });
    describe('createCustom', () => {
        it('calls POST /modifiers/custom with data', async () => {
            const data = { type: 'brand', value: 'Samsung', category: 'appliance' };
            await modifiers.createCustom(data);
            expect(mockHttp.post).toHaveBeenCalledWith('/modifiers/custom', data);
        });
    });
    describe('deleteCustom', () => {
        it('calls DELETE /modifiers/custom/:id', async () => {
            await modifiers.deleteCustom(42);
            expect(mockHttp.delete).toHaveBeenCalledWith('/modifiers/custom/42');
        });
        it('works with string id', async () => {
            await modifiers.deleteCustom('42');
            expect(mockHttp.delete).toHaveBeenCalledWith('/modifiers/custom/42');
        });
    });
    describe('disable', () => {
        it('calls POST /modifiers/:id/disable', async () => {
            await modifiers.disable(10);
            expect(mockHttp.post).toHaveBeenCalledWith('/modifiers/10/disable');
        });
    });
    describe('enable', () => {
        it('calls POST /modifiers/:id/enable', async () => {
            await modifiers.enable(10);
            expect(mockHttp.post).toHaveBeenCalledWith('/modifiers/10/enable');
        });
    });
    describe('compose', () => {
        it('calls POST /modifiers/compose with data', async () => {
            const data = { item_name: 'sink', modifiers: [1, 2, 3] };
            await modifiers.compose(data);
            expect(mockHttp.post).toHaveBeenCalledWith('/modifiers/compose', data);
        });
    });
});
