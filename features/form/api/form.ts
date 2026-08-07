import api, { unwrap } from "@/lib/api-client";

import { Form } from "../types/form";
import { ApiResponse, PaginatedResponse } from "@/types/api";
import { FormFormValues } from "../schemas/form";

export const formApi = {
  list() {
    return unwrap(api.get<ApiResponse<PaginatedResponse<Form>>>("/forms"));
  },

  create(data: FormFormValues) {
    return unwrap(api.post<ApiResponse<Form>>("/forms", data));
  },

  update(id: number, data: FormFormValues) {
    return unwrap(api.put<ApiResponse<Form>>(`/forms/${id}`, data));
  },

  delete(id: number) {
    return unwrap(api.delete<ApiResponse<void>>(`/forms/${id}`));
  },

  getBySlug(slug: string) {
    return unwrap(api.get<ApiResponse<Form>>(`/forms/slug/${slug}`));
  },

};
