import { HttpClient } from '../http/client';

export type AssetCheckTested = 'yes' | 'no' | 'not_accessible';
export type AssetCheckResult = 'pass' | 'fail' | 'na';
export type AssetCheckCondition = 'good' | 'fair' | 'poor' | 'replace';

export interface UpdateAssetCheckData {
  tested?: AssetCheckTested | null;
  test_result?: AssetCheckResult | null;
  condition?: AssetCheckCondition | null;
  notes?: string | null;
}

export class AssetChecks {
  constructor(private http: HttpClient) {}

  async update(
    inspectionId: number | string,
    assetCheckId: string,
    data: UpdateAssetCheckData,
  ): Promise<{ data: any }> {
    return this.http.put(`/inspections/${inspectionId}/asset-checks/${assetCheckId}`, data);
  }

  async uploadPhoto(
    inspectionId: number | string,
    assetCheckId: string,
    file: File | Blob | Buffer,
  ): Promise<any> {
    return this.http.upload(`/inspections/${inspectionId}/asset-checks/${assetCheckId}/photos`, file, 'photo');
  }
}
