import api, { unwrap } from "@/lib/api-client";

import { Distribution } from "../types/distribution";
import { ApiResponse, PaginatedResponse } from "@/types/api";
import { DistributionFormValues } from "../schemas/distribution";

export const distributionApi = {
  list() {
    return unwrap(api.get<ApiResponse<PaginatedResponse<Distribution>>>("distributions"));
  },

  show(id: number) {
    return unwrap(api.get<ApiResponse<Distribution>>(`distributions/${id}`));
  },

  create(data: DistributionFormValues) {
    return unwrap(api.post<ApiResponse<Distribution>>("distributions", data));
  },

  update(id: number, data: DistributionFormValues) {
    return unwrap(api.put<ApiResponse<Distribution>>(`distributions/${id}`, data));
  },

  delete(id: number) {
    return unwrap(api.delete<ApiResponse<void>>(`distributions/${id}`));
  },

  getBySlug(slug: string) {
    return unwrap(api.get<ApiResponse<Distribution>>(`distributions/slug/${slug}`));
  },

};
