import { UserResource } from '../../resources/user';
import { HttpClient } from '../../http/client';

jest.mock('../../http/client');

describe('UserResource', () => {
  let user: UserResource;
  let mockHttp: jest.Mocked<HttpClient>;

  beforeEach(() => {
    mockHttp = new HttpClient('test-token') as jest.Mocked<HttpClient>;
    mockHttp.get = jest.fn().mockResolvedValue({ data: { id: 1, email: 'test@example.com' } });
    user = new UserResource(mockHttp);
  });

  describe('me', () => {
    it('calls GET /user', async () => {
      const result = await user.me();
      expect(mockHttp.get).toHaveBeenCalledWith('/user');
      expect(result).toEqual({ data: { id: 1, email: 'test@example.com' } });
    });
  });
});
