import { StatsResource } from '../../resources/stats';
import { HttpClient } from '../../http/client';

jest.mock('../../http/client');

describe('StatsResource', () => {
  let stats: StatsResource;
  let mockHttp: jest.Mocked<HttpClient>;

  beforeEach(() => {
    mockHttp = new HttpClient('test-token') as jest.Mocked<HttpClient>;
    mockHttp.get = jest.fn().mockResolvedValue({ data: {} });
    stats = new StatsResource(mockHttp);
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
