import { InspectionAi } from '../../resources/inspection-ai';
import { HttpClient } from '../../http/client';

jest.mock('../../http/client');

describe('InspectionAi', () => {
  let ai: InspectionAi;
  let mockHttp: jest.Mocked<HttpClient>;

  beforeEach(() => {
    mockHttp = new HttpClient('test-token') as jest.Mocked<HttpClient>;
    mockHttp.get = jest.fn().mockResolvedValue({ data: {} });
    mockHttp.post = jest.fn().mockResolvedValue({ data: {} });
    ai = new InspectionAi(mockHttp);
  });

  describe('enable', () => {
    it('calls POST /inspections/:id/ai/enable', async () => {
      await ai.enable(1);
      expect(mockHttp.post).toHaveBeenCalledWith('/inspections/1/ai/enable');
    });
  });

  describe('disable', () => {
    it('calls POST /inspections/:id/ai/disable', async () => {
      await ai.disable(1);
      expect(mockHttp.post).toHaveBeenCalledWith('/inspections/1/ai/disable');
    });
  });

  describe('status', () => {
    it('calls GET /inspections/:id/ai/status', async () => {
      await ai.status(1);
      expect(mockHttp.get).toHaveBeenCalledWith('/inspections/1/ai/status');
    });
  });

  describe('retryCredits', () => {
    it('calls POST /inspections/:id/ai/retry-credits', async () => {
      await ai.retryCredits(1);
      expect(mockHttp.post).toHaveBeenCalledWith('/inspections/1/ai/retry-credits');
    });
  });

  describe('requestRetry', () => {
    it('calls POST /inspections/:id/ai/request-retry', async () => {
      await ai.requestRetry(1);
      expect(mockHttp.post).toHaveBeenCalledWith('/inspections/1/ai/request-retry');
    });
  });

  describe('retryStatus', () => {
    it('calls GET /inspections/:id/ai/retry-status', async () => {
      await ai.retryStatus(1);
      expect(mockHttp.get).toHaveBeenCalledWith('/inspections/1/ai/retry-status');
    });
  });

  describe('submitFeedback', () => {
    it('calls POST /inspections/:id/ai/feedback with data', async () => {
      const data = { rating: 5, comment: 'Great results' };
      await ai.submitFeedback(1, data);
      expect(mockHttp.post).toHaveBeenCalledWith('/inspections/1/ai/feedback', data);
    });
  });
});
