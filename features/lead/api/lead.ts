import api, { unwrap } from "@/lib/api-client";

import { Lead } from "../types/lead";
import { ApiResponse, PaginatedResponse } from "@/types/api";
import { LeadFormValues } from "../schemas/lead";

export const leadApi = {
  list() {
    return unwrap(api.get<ApiResponse<PaginatedResponse<Lead>>>("/leads"));
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
