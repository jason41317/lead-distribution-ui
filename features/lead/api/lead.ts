import api, { unwrap } from "@/lib/api-client";

import { Lead, LeadFilters } from "../types/lead";
import { ApiResponse, PaginatedResponse } from "@/types/api";
import { LeadFormValues } from "../schemas/lead";

export const leadApi = {
  list(params?: LeadFilters) {
      const url = params
        ? `/leads?${new URLSearchParams(params as Record<string, any>).toString()}`
        : "/leads";
  
      return unwrap(api.get<ApiResponse<PaginatedResponse<Lead>>>(url));
    },

  create(data: LeadFormValues) {
    return unwrap(api.post<ApiResponse<Lead>>("/leads", data));
  },

  createPublic(data: LeadFormValues) {
    return unwrap(api.post<ApiResponse<Lead>>("/leads/public", data));
  },

  update(id: number, data: LeadFormValues) {
    return unwrap(api.put<ApiResponse<Lead>>(`/leads/${id}`, data));
  },

  delete(id: number) {
    return unwrap(api.delete<ApiResponse<void>>(`/leads/${id}`));
  },

  // getBySlug(slug: string) {
  //   return unwrap(api.get<ApiResponse<Lead>>(`/leads/slug/${slug}`));
  // },

};
