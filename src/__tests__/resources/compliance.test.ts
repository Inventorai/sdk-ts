import { Compliance } from '../../resources/compliance';
import { HttpClient } from '../../http/client';

jest.mock('../../http/client');

describe('Compliance', () => {
  let compliance: Compliance;
  let mockHttp: jest.Mocked<HttpClient>;

  beforeEach(() => {
    mockHttp = new HttpClient('test-token') as jest.Mocked<HttpClient>;
    mockHttp.get = jest.fn().mockResolvedValue({ data: [] });
    mockHttp.post = jest.fn().mockResolvedValue({ data: {} });
    mockHttp.patch = jest.fn().mockResolvedValue({ data: {} });
    mockHttp.delete = jest.fn().mockResolvedValue(undefined);
    mockHttp.upload = jest.fn().mockResolvedValue({ data: {} });
    compliance = new Compliance(mockHttp);
  });

  describe('list', () => {
    it('calls GET /inspections/:id/compliance', async () => {
      await compliance.list(1);
      expect(mockHttp.get).toHaveBeenCalledWith('/inspections/1/compliance');
    });
  });

  describe('attach', () => {
    it('calls POST /inspections/:id/compliance/attach with form_id', async () => {
      await compliance.attach(1, 'form-5');
      expect(mockHttp.post).toHaveBeenCalledWith('/inspections/1/compliance/attach', { form_id: 'form-5' });
    });

    it('accepts numeric form id', async () => {
      await compliance.attach(1, 5);
      expect(mockHttp.post).toHaveBeenCalledWith('/inspections/1/compliance/attach', { form_id: 5 });
    });
  });

  describe('attachMultiple', () => {
    it('calls POST /inspections/:id/compliance/attach-multiple with form_ids', async () => {
      await compliance.attachMultiple(1, [1, 2, 3]);
      expect(mockHttp.post).toHaveBeenCalledWith('/inspections/1/compliance/attach-multiple', { form_ids: [1, 2, 3] });
    });
  });

  describe('updateResponse', () => {
    it('calls PATCH /inspections/:id/compliance/fields/:fieldId with data', async () => {
      const data = { value: 'Yes', section_instance: 1 };
      await compliance.updateResponse(1, 42, data);
      expect(mockHttp.patch).toHaveBeenCalledWith('/inspections/1/compliance/fields/42', data);
    });

    it('works without section_instance', async () => {
      const data = { value: 'No' };
      await compliance.updateResponse(1, 42, data);
      expect(mockHttp.patch).toHaveBeenCalledWith('/inspections/1/compliance/fields/42', data);
    });
  });

  describe('batchUpdateResponses', () => {
    it('calls POST /inspections/:id/compliance/batch with fields', async () => {
      const fields = { '1': 'Yes', '2': 'No' };
      await compliance.batchUpdateResponses(1, fields);
      expect(mockHttp.post).toHaveBeenCalledWith('/inspections/1/compliance/batch', { fields });
    });
  });

  describe('uploadFile', () => {
    it('calls upload with correct endpoint and field name', async () => {
      const file = Buffer.from('file-data');
      await compliance.uploadFile(1, file);
      expect(mockHttp.upload).toHaveBeenCalledWith('/inspections/1/compliance/upload', file, 'file');
    });
  });

  describe('addSectionInstance', () => {
    it('calls POST /inspections/:id/compliance/section-instance with data', async () => {
      const data = { form_id: 10, section_id: 20 };
      await compliance.addSectionInstance(1, data);
      expect(mockHttp.post).toHaveBeenCalledWith('/inspections/1/compliance/section-instance', data);
    });
  });

  describe('removeSectionInstance', () => {
    it('calls DELETE /inspections/:id/compliance/section-instance/:instanceId', async () => {
      await compliance.removeSectionInstance(1, 99);
      expect(mockHttp.delete).toHaveBeenCalledWith('/inspections/1/compliance/section-instance/99');
    });
  });

  describe('summary', () => {
    it('calls GET /inspections/:id/compliance/summary', async () => {
      await compliance.summary(1);
      expect(mockHttp.get).toHaveBeenCalledWith('/inspections/1/compliance/summary');
    });
  });

  describe('update', () => {
    it('calls PATCH /inspections/:id/compliance-forms/:formId with data', async () => {
      const data = { name: 'Updated form' };
      await compliance.update(1, 5, data);
      expect(mockHttp.patch).toHaveBeenCalledWith('/inspections/1/compliance-forms/5', data);
    });
  });

  describe('detach', () => {
    it('calls DELETE /inspections/:id/compliance-forms/:formId', async () => {
      await compliance.detach(1, 5);
      expect(mockHttp.delete).toHaveBeenCalledWith('/inspections/1/compliance-forms/5');
    });
  });
});
