"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inspection_areas_1 = require("../../resources/inspection-areas");
const client_1 = require("../../http/client");
jest.mock('../../http/client');
describe('InspectionAreas', () => {
    let areas;
    let mockHttp;
    beforeEach(() => {
        mockHttp = new client_1.HttpClient('test-token');
        mockHttp.get = jest.fn().mockResolvedValue({ data: [] });
        mockHttp.post = jest.fn().mockResolvedValue({ data: {} });
        mockHttp.patch = jest.fn().mockResolvedValue({ data: {} });
        mockHttp.delete = jest.fn().mockResolvedValue(undefined);
        mockHttp.upload = jest.fn().mockResolvedValue({ data: {} });
        areas = new inspection_areas_1.InspectionAreas(mockHttp);
    });
    describe('list', () => {
        it('calls GET /inspections/:id/areas with default empty params', async () => {
            await areas.list(1);
            expect(mockHttp.get).toHaveBeenCalledWith('/inspections/1/areas', {});
        });
        it('passes ListParams', async () => {
            const params = { page: 2, per_page: 5 };
            await areas.list(1, params);
            expect(mockHttp.get).toHaveBeenCalledWith('/inspections/1/areas', params);
        });
    });
    describe('get', () => {
        it('calls GET /inspections/:id/areas/:areaId with no params', async () => {
            await areas.get(1, 'area-uuid');
            expect(mockHttp.get).toHaveBeenCalledWith('/inspections/1/areas/area-uuid', {});
        });
        it('passes include as string', async () => {
            await areas.get(1, 'area-uuid', { include: 'items' });
            expect(mockHttp.get).toHaveBeenCalledWith('/inspections/1/areas/area-uuid', { include: 'items' });
        });
        it('joins include array into comma-separated string', async () => {
            await areas.get(1, 'area-uuid', { include: ['items', 'photos'] });
            expect(mockHttp.get).toHaveBeenCalledWith('/inspections/1/areas/area-uuid', { include: 'items,photos' });
        });
    });
    describe('create', () => {
        it('calls POST /inspections/:id/areas with data', async () => {
            const data = { name: 'Kitchen', category: 'room' };
            await areas.create(1, data);
            expect(mockHttp.post).toHaveBeenCalledWith('/inspections/1/areas', data);
        });
    });
    describe('update', () => {
        it('calls PATCH /inspections/:id/areas/:areaId with data', async () => {
            const data = { name: 'Living Room' };
            await areas.update(1, 'area-uuid', data);
            expect(mockHttp.patch).toHaveBeenCalledWith('/inspections/1/areas/area-uuid', data);
        });
    });
    describe('delete', () => {
        it('calls DELETE /inspections/:id/areas/:areaId', async () => {
            await areas.delete(1, 'area-uuid');
            expect(mockHttp.delete).toHaveBeenCalledWith('/inspections/1/areas/area-uuid');
        });
    });
    describe('duplicate', () => {
        it('calls POST /inspections/:id/areas/:areaId/duplicate', async () => {
            await areas.duplicate(1, 'area-uuid');
            expect(mockHttp.post).toHaveBeenCalledWith('/inspections/1/areas/area-uuid/duplicate');
        });
    });
    describe('reorder', () => {
        it('calls POST /inspections/:id/areas/reorder with order array', async () => {
            const order = ['uuid-1', 'uuid-2', 'uuid-3'];
            await areas.reorder(1, order);
            expect(mockHttp.post).toHaveBeenCalledWith('/inspections/1/areas/reorder', { order });
        });
    });
    describe('uploadPhoto', () => {
        it('calls upload with correct endpoint and field name', async () => {
            const file = Buffer.from('photo-data');
            await areas.uploadPhoto(1, 'area-uuid', file);
            expect(mockHttp.upload).toHaveBeenCalledWith('/inspections/1/areas/area-uuid/photos', file, 'photo');
        });
    });
    describe('deletePhoto', () => {
        it('calls DELETE /inspections/:id/areas/:areaId/photos/:photoId', async () => {
            await areas.deletePhoto(1, 'area-uuid', 'photo-uuid');
            expect(mockHttp.delete).toHaveBeenCalledWith('/inspections/1/areas/area-uuid/photos/photo-uuid');
        });
    });
});
