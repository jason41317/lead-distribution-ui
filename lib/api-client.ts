import api from "./axios";

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
