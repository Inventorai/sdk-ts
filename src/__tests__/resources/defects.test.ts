import { Defects } from '../../resources/defects';
import { HttpClient } from '../../http/client';

jest.mock('../../http/client');

describe('Defects', () => {
  let defects: Defects;
  let mockHttp: jest.Mocked<HttpClient>;

  beforeEach(() => {
    mockHttp = new HttpClient('test-token') as jest.Mocked<HttpClient>;
    mockHttp.get = jest.fn().mockResolvedValue({ data: [] });
    mockHttp.post = jest.fn().mockResolvedValue({ data: {} });
    mockHttp.patch = jest.fn().mockResolvedValue({ data: {} });
    mockHttp.delete = jest.fn().mockResolvedValue(undefined);
    mockHttp.upload = jest.fn().mockResolvedValue({ data: {} });
    defects = new Defects(mockHttp);
  });

  describe('list', () => {
    it('calls GET /inspections/:id/defects with default empty params', async () => {
      await defects.list(1);
      expect(mockHttp.get).toHaveBeenCalledWith('/inspections/1/defects', {});
    });

    it('passes ListParams', async () => {
      const params = { filter: { severity: 'critical' } };
      await defects.list(1, params);
      expect(mockHttp.get).toHaveBeenCalledWith('/inspections/1/defects', params);
    });
  });

  describe('get', () => {
    it('calls GET /inspections/:id/defects/:defectId', async () => {
      await defects.get(1, 'defect-uuid');
      expect(mockHttp.get).toHaveBeenCalledWith('/inspections/1/defects/defect-uuid');
    });
  });

  describe('create', () => {
    it('calls POST /inspections/:id/defects with data', async () => {
      const data = {
        defectable_type: 'area' as const,
        defectable_id: 'area-uuid',
        title: 'Cracked wall',
      };
      await defects.create(1, data);
      expect(mockHttp.post).toHaveBeenCalledWith('/inspections/1/defects', data);
    });
  });

  describe('createForArea', () => {
    it('calls POST /inspections/:id/areas/:areaId/defects', async () => {
      const data = { title: 'Stained carpet' };
      await defects.createForArea(1, 'area-uuid', data);
      expect(mockHttp.post).toHaveBeenCalledWith('/inspections/1/areas/area-uuid/defects', data);
    });
  });

  describe('createForItem', () => {
    it('calls POST /inspections/:id/items/:itemId/defects', async () => {
      const data = { title: 'Broken handle' };
      await defects.createForItem(1, 'item-uuid', data);
      expect(mockHttp.post).toHaveBeenCalledWith('/inspections/1/items/item-uuid/defects', data);
    });
  });

  describe('createForElement', () => {
    it('calls POST /inspections/:id/elements/:elementId/defects', async () => {
      const data = { title: 'Chipped paint' };
      await defects.createForElement(1, 'element-uuid', data);
      expect(mockHttp.post).toHaveBeenCalledWith('/inspections/1/elements/element-uuid/defects', data);
    });
  });

  describe('update', () => {
    it('calls PATCH /inspections/:id/defects/:defectId with data', async () => {
      const data = { title: 'Updated title', severity: 'major' as const };
      await defects.update(1, 'defect-uuid', data);
      expect(mockHttp.patch).toHaveBeenCalledWith('/inspections/1/defects/defect-uuid', data);
    });
  });

  describe('delete', () => {
    it('calls DELETE /inspections/:id/defects/:defectId', async () => {
      await defects.delete(1, 'defect-uuid');
      expect(mockHttp.delete).toHaveBeenCalledWith('/inspections/1/defects/defect-uuid');
    });
  });

  describe('uploadPhoto', () => {
    it('calls upload with correct endpoint and field name', async () => {
      const file = Buffer.from('photo-data');
      await defects.uploadPhoto(1, 'defect-uuid', file);
      expect(mockHttp.upload).toHaveBeenCalledWith('/inspections/1/defects/defect-uuid/photos', file, 'photo');
    });
  });

  describe('deletePhoto', () => {
    it('calls DELETE /inspections/:id/defects/:defectId/photos/:photoId', async () => {
      await defects.deletePhoto(1, 'defect-uuid', 'photo-uuid');
      expect(mockHttp.delete).toHaveBeenCalledWith('/inspections/1/defects/defect-uuid/photos/photo-uuid');
    });
  });
});
