import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ApiError, AuthenticationError, RateLimitError } from '../errors/api-error';
import { ListParams } from '../types';

export class HttpClient {
  private client: AxiosInstance;

  constructor(apiToken: string, baseURL: string = 'https://api.inventorai.co.uk/v1') {
    this.client = axios.create({
      baseURL,
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          const { status, data } = error.response;
          const message = data?.message || error.message;

          switch (status) {
            case 401:
              throw new AuthenticationError(message, status, data);
            case 429:
              throw new RateLimitError(message, status, data);
            default:
              throw new ApiError(message, status, data);
          }
        }
        throw new ApiError(error.message);
      }
    );
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const response = await this.client.get(endpoint, { params });
    return response.data;
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.client.post(endpoint, data);
    return response.data;
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.client.put(endpoint, data);
    return response.data;
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.client.patch(endpoint, data);
    return response.data;
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await this.client.delete(endpoint);
    return response.data;
  }

  async upload<T>(endpoint: string, file: File | Blob | Buffer, fieldName: string = 'file'): Promise<T> {
    const formData = new FormData();
    formData.append(fieldName, file as any);
    const response = await this.client.post<T>(endpoint, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  buildQuery(params: ListParams): Record<string, string> {
    const query: Record<string, string> = {};

    if (params.filter) {
      Object.entries(params.filter).forEach(([key, value]) => {
        query[`filter[${key}]`] = value;
      });
    }

    if (params.include) {
      query.include = Array.isArray(params.include)
        ? params.include.join(',')
        : params.include;
    }

    if (params.sort) {
      query.sort = params.sort;
    }

    if (params.per_page) {
      query.per_page = params.per_page.toString();
    }

    if (params.page) {
      query.page = params.page.toString();
    }

    return query;
  }
}
