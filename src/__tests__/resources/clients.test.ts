import { Clients } from '../../resources/clients';
import { Hazards } from '../../resources/hazards';
import { Vocabulary } from '../../resources/vocabulary';
import { HttpClient } from '../../http/client';

jest.mock('../../http/client');

describe('Clients, Hazards and Vocabulary', () => {
  let mockHttp: jest.Mocked<HttpClient>;

  beforeEach(() => {
    mockHttp = new HttpClient('test-token') as jest.Mocked<HttpClient>;
    mockHttp.get = jest.fn().mockResolvedValue({ data: {} });
  });

  it('lists clients with scope and joined includes', async () => {
    await new Clients(mockHttp).list({ scope: 'all', include: ['group', 'branches'] });
    expect(mockHttp.get).toHaveBeenCalledWith('/clients', { scope: 'all', include: 'group,branches' });
  });

  it('gets a client', async () => {
    await new Clients(mockHttp).get('01ABC');
    expect(mockHttp.get).toHaveBeenCalledWith('/clients/01ABC', {});
  });

  it('lists client groups', async () => {
    await new Clients(mockHttp).groups({ per_page: 10 });
    expect(mockHttp.get).toHaveBeenCalledWith('/clients/groups', { per_page: 10 });
  });

  it('gets a client group', async () => {
    await new Clients(mockHttp).group('01GRP', { include: 'clients' });
    expect(mockHttp.get).toHaveBeenCalledWith('/clients/groups/01GRP', { include: 'clients' });
  });

  it('syncs hazards', async () => {
    await new Hazards(mockHttp).sync();
    expect(mockHttp.get).toHaveBeenCalledWith('/hazards/sync');
  });

  it('syncs vocabulary', async () => {
    await new Vocabulary(mockHttp).sync();
    expect(mockHttp.get).toHaveBeenCalledWith('/vocabulary/sync');
  });
});
