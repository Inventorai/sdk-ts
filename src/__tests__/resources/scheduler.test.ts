import { Scheduler } from '../../resources/scheduler';
import { HttpClient } from '../../http/client';

jest.mock('../../http/client');

describe('Scheduler', () => {
  let scheduler: Scheduler;
  let mockHttp: jest.Mocked<HttpClient>;

  beforeEach(() => {
    mockHttp = new HttpClient('test-token') as jest.Mocked<HttpClient>;
    mockHttp.get = jest.fn().mockResolvedValue({ data: {} });
    mockHttp.post = jest.fn().mockResolvedValue({ data: {} });
    scheduler = new Scheduler(mockHttp);
  });

  describe('calendar', () => {
    it('calls GET /inspections/scheduler/calendar with default empty params', async () => {
      await scheduler.calendar();
      expect(mockHttp.get).toHaveBeenCalledWith('/inspections/scheduler/calendar', {});
    });

    it('passes params to GET /inspections/scheduler/calendar', async () => {
      const params = { month: '2026-04', inspector_id: 5 };
      await scheduler.calendar(params);
      expect(mockHttp.get).toHaveBeenCalledWith('/inspections/scheduler/calendar', params);
    });
  });

  describe('weeklyAvailability', () => {
    it('calls POST /inspections/scheduler/availability/weekly with data', async () => {
      const data = { week_start: '2026-04-06', inspector_id: 5 };
      await scheduler.weeklyAvailability(data);
      expect(mockHttp.post).toHaveBeenCalledWith('/inspections/scheduler/availability/weekly', data);
    });
  });

  describe('checkConflicts', () => {
    it('calls POST /inspections/scheduler/availability/check-conflicts with data', async () => {
      const data = { date: '2026-04-10', time: '10:00', inspector_id: 5 };
      await scheduler.checkConflicts(data);
      expect(mockHttp.post).toHaveBeenCalledWith('/inspections/scheduler/availability/check-conflicts', data);
    });
  });

  describe('officeHours', () => {
    it('calls GET /inspections/scheduler/office-hours', async () => {
      await scheduler.officeHours();
      expect(mockHttp.get).toHaveBeenCalledWith('/inspections/scheduler/office-hours');
    });
  });

  describe('estimateDuration', () => {
    it('calls POST /inspections/scheduler/estimate-duration with data', async () => {
      const data = { property_id: 1, type: 'move_in' };
      await scheduler.estimateDuration(data);
      expect(mockHttp.post).toHaveBeenCalledWith('/inspections/scheduler/estimate-duration', data);
    });
  });
});
