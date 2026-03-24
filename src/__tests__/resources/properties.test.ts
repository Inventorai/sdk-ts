import { Properties } from '../../resources/properties';
import { HttpClient } from '../../http/client';

jest.mock('../../http/client');

describe('Properties', () => {
  let properties: Properties;
  let mockHttp: jest.Mocked<HttpClient>;

  beforeEach(() => {
    mockHttp = new HttpClient('test-token') as jest.Mocked<HttpClient>;
    mockHttp.get = jest.fn().mockResolvedValue({ data: [] });
    mockHttp.post = jest.fn().mockResolvedValue({ data: {} });
    mockHttp.put = jest.fn().mockResolvedValue({ data: {} });
    mockHttp.patch = jest.fn().mockResolvedValue({ data: {} });
    mockHttp.delete = jest.fn().mockResolvedValue(undefined);
    mockHttp.upload = jest.fn().mockResolvedValue({ data: {} });
    properties = new Properties(mockHttp);
  });

  describe('list', () => {
    it('calls GET /properties with default empty params', async () => {
      await properties.list();
      expect(mockHttp.get).toHaveBeenCalledWith('/properties', {});
    });

    it('passes ListParams to GET /properties', async () => {
      const params = { filter: { status: 'active' }, page: 2, per_page: 10 };
      await properties.list(params);
      expect(mockHttp.get).toHaveBeenCalledWith('/properties', params);
    });
  });

  describe('get', () => {
    it('calls GET /properties/:id with no params', async () => {
      await properties.get(1);
      expect(mockHttp.get).toHaveBeenCalledWith('/properties/1', {});
    });

    it('calls GET /properties/:id with string id', async () => {
      await properties.get('abc');
      expect(mockHttp.get).toHaveBeenCalledWith('/properties/abc', {});
    });

    it('passes include as string', async () => {
      await properties.get(1, { include: 'inspections' });
      expect(mockHttp.get).toHaveBeenCalledWith('/properties/1', { include: 'inspections' });
    });

    it('joins include array into comma-separated string', async () => {
      await properties.get(1, { include: ['inspections', 'tenancies'] });
      expect(mockHttp.get).toHaveBeenCalledWith('/properties/1', { include: 'inspections,tenancies' });
    });
  });

  describe('create', () => {
    it('calls POST /properties with data', async () => {
      const data = {
        address_line_1: '123 Main St',
        postcode: 'SW1A 1AA',
        country: 'GB',
        property_type: 'house' as const,
        residential: true,
      };
      await properties.create(data);
      expect(mockHttp.post).toHaveBeenCalledWith('/properties', data);
    });
  });

  describe('activeTenancy', () => {
    it('calls GET /properties/:id/active-tenancy', async () => {
      await properties.activeTenancy(42);
      expect(mockHttp.get).toHaveBeenCalledWith('/properties/42/active-tenancy');
    });

    it('works with string id', async () => {
      await properties.activeTenancy('42');
      expect(mockHttp.get).toHaveBeenCalledWith('/properties/42/active-tenancy');
    });
  });

  describe('uploadCoverImage', () => {
    it('calls upload with correct endpoint and field name', async () => {
      const file = Buffer.from('image-data');
      await properties.uploadCoverImage(1, file);
      expect(mockHttp.upload).toHaveBeenCalledWith('/properties/1/cover-image', file, 'cover_image');
    });
  });

  describe('deleteCoverImage', () => {
    it('calls DELETE /properties/:id/cover-image', async () => {
      await properties.deleteCoverImage(1);
      expect(mockHttp.delete).toHaveBeenCalledWith('/properties/1/cover-image');
    });
  });
});
