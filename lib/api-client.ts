import api from "./axios";

import { AxiosResponse } from "axios";

export async function unwrap<T>(
  request: Promise<AxiosResponse<T>>,
): Promise<T> {
  const response = await request;
  return response.data;
}

export class ApiClient {
  get<T>(url: string) {
    return api.get<T>(url);
  }

  post<T>(url: string, data?: unknown) {
    return api.post<T>(url, data);
  }

  put<T>(url: string, data?: unknown) {
    return api.put<T>(url, data);
  }

  delete<T>(url: string) {
    return api.delete<T>(url);
  }
}

export default new ApiClient();
