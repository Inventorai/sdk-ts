import { TeamResource } from '../../resources/team';
import { HttpClient } from '../../http/client';

jest.mock('../../http/client');

describe('TeamResource', () => {
  let team: TeamResource;
  let mockHttp: jest.Mocked<HttpClient>;

  const teamPayload = {
    data: {
      id: '01HXYZ',
      name: 'Acme Lettings',
      slug: 'acme-lettings',
      subscription: { subscribed: true, on_trial: false },
    },
  };

  beforeEach(() => {
    mockHttp = new HttpClient('test-token') as jest.Mocked<HttpClient>;
    mockHttp.get = jest.fn().mockResolvedValue(teamPayload);
    team = new TeamResource(mockHttp);
  });

  describe('current', () => {
    it('hits the root of the team base URL', async () => {
      const result = await team.current();
      expect(mockHttp.get).toHaveBeenCalledWith('');
      expect(result).toEqual(teamPayload);
    });
  });
});
