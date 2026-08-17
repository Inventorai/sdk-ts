import { AssetChecks } from '../../resources/asset-checks';
import { HttpClient } from '../../http/client';

jest.mock('../../http/client');

describe('AssetChecks', () => {
  let assetChecks: AssetChecks;
  let mockHttp: jest.Mocked<HttpClient>;

  beforeEach(() => {
    mockHttp = new HttpClient('test-token') as jest.Mocked<HttpClient>;
    mockHttp.put = jest.fn().mockResolvedValue({ data: { id: '7', tested: 'yes' } });
    mockHttp.upload = jest.fn().mockResolvedValue({ data: { id: 'photo-1' } });
    assetChecks = new AssetChecks(mockHttp);
  });

  describe('update', () => {
    it('puts to the asset check endpoint', async () => {
      const data = { tested: 'yes' as const, test_result: 'pass' as const, condition: 'good' as const };

      const result = await assetChecks.update(42, '7', data);

      expect(mockHttp.put).toHaveBeenCalledWith('/inspections/42/asset-checks/7', data);
      expect(result).toEqual({ data: { id: '7', tested: 'yes' } });
    });
  });

  describe('uploadPhoto', () => {
    it('uploads under the photo field', async () => {
      const file = new Blob(['x']);

      const result = await assetChecks.uploadPhoto(42, '7', file);

      expect(mockHttp.upload).toHaveBeenCalledWith('/inspections/42/asset-checks/7/photos', file, 'photo');
      expect(result).toEqual({ data: { id: 'photo-1' } });
    });
  });
});
