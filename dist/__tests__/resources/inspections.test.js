"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inspections_1 = require("../../resources/inspections");
const client_1 = require("../../http/client");
jest.mock('../../http/client');
describe('Inspections', () => {
    let inspections;
    let mockHttp;
    beforeEach(() => {
        mockHttp = new client_1.HttpClient('test-token');
        mockHttp.get = jest.fn().mockResolvedValue({ data: [] });
        mockHttp.post = jest.fn().mockResolvedValue({ data: {} });
        mockHttp.put = jest.fn().mockResolvedValue({ data: {} });
        mockHttp.patch = jest.fn().mockResolvedValue({ data: {} });
        mockHttp.delete = jest.fn().mockResolvedValue(undefined);
        mockHttp.upload = jest.fn().mockResolvedValue({ data: {} });
        inspections = new inspections_1.Inspections(mockHttp);
    });
    describe('list', () => {
        it('calls GET /inspections with default empty params', async () => {
            await inspections.list();
            expect(mockHttp.get).toHaveBeenCalledWith('/inspections', {});
        });
        it('passes ListParams to GET /inspections', async () => {
            const params = { filter: { type: 'move_in' }, page: 1 };
            await inspections.list(params);
            expect(mockHttp.get).toHaveBeenCalledWith('/inspections', params);
        });
    });
    describe('get', () => {
        it('calls GET /inspections/:id with no params', async () => {
            await inspections.get(5);
            expect(mockHttp.get).toHaveBeenCalledWith('/inspections/5', {});
        });
        it('passes include as string', async () => {
            await inspections.get(5, { include: 'areas' });
            expect(mockHttp.get).toHaveBeenCalledWith('/inspections/5', { include: 'areas' });
        });
        it('joins include array into comma-separated string', async () => {
            await inspections.get(5, { include: ['areas', 'items', 'defects'] });
            expect(mockHttp.get).toHaveBeenCalledWith('/inspections/5', { include: 'areas,items,defects' });
        });
    });
    describe('create', () => {
        it('calls POST /inspections with data', async () => {
            const data = {
                property_id: 1,
                type: 'move_in',
                inspection_date: '2026-04-01',
            };
            await inspections.create(data);
            expect(mockHttp.post).toHaveBeenCalledWith('/inspections', data);
        });
    });
    describe('checkExisting', () => {
        it('calls GET /inspections/check-existing with params', async () => {
            const params = { property_id: 1, type: 'move_in' };
            await inspections.checkExisting(params);
            expect(mockHttp.get).toHaveBeenCalledWith('/inspections/check-existing', params);
        });
    });
    describe('comparable', () => {
        it('calls GET /inspections/comparable with params', async () => {
            const params = { property_id: 1 };
            await inspections.comparable(params);
            expect(mockHttp.get).toHaveBeenCalledWith('/inspections/comparable', params);
        });
    });
    describe('begin', () => {
        it('calls POST /inspections/:id/begin', async () => {
            await inspections.begin(10);
            expect(mockHttp.post).toHaveBeenCalledWith('/inspections/10/begin');
        });
    });
    describe('finalize', () => {
        it('calls POST /inspections/:id/finalize with default empty data', async () => {
            await inspections.finalize(10);
            expect(mockHttp.post).toHaveBeenCalledWith('/inspections/10/finalize', {});
        });
        it('calls POST /inspections/:id/finalize with data', async () => {
            const data = { send_report: true };
            await inspections.finalize(10, data);
            expect(mockHttp.post).toHaveBeenCalledWith('/inspections/10/finalize', data);
        });
    });
    describe('reschedule', () => {
        it('calls PATCH /inspections/:id/reschedule with data', async () => {
            const data = {
                inspection_date: '2026-05-01',
                inspection_time: '10:00',
            };
            await inspections.reschedule(10, data);
            expect(mockHttp.patch).toHaveBeenCalledWith('/inspections/10/reschedule', data);
        });
    });
    describe('uploadCoverImage', () => {
        it('calls upload with correct endpoint and field name', async () => {
            const file = Buffer.from('image-data');
            await inspections.uploadCoverImage(10, file);
            expect(mockHttp.upload).toHaveBeenCalledWith('/inspections/10/cover-image', file, 'cover_image');
        });
    });
    describe('deleteCoverImage', () => {
        it('calls DELETE /inspections/:id/cover-image', async () => {
            await inspections.deleteCoverImage(10);
            expect(mockHttp.delete).toHaveBeenCalledWith('/inspections/10/cover-image');
        });
    });
});
