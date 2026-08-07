import api, { unwrap } from "@/lib/api-client";

import { Broker, BrokerFilters } from "../types/broker";
import { ApiResponse, PaginatedResponse } from "@/types/api";
import { BrokerFormValues } from "../schemas/broker";

export const brokerApi = {
  list(params?: BrokerFilters) {
    const url = params
      ? `/brokers?${new URLSearchParams(params as Record<string, any>).toString()}`
      : "/brokers";

    return unwrap(api.get<ApiResponse<PaginatedResponse<Broker>>>(url));
  },

  create(data: BrokerFormValues) {
    return unwrap(api.post<ApiResponse<Broker>>("/brokers", data));
  },

  update(id: number, data: BrokerFormValues) {
    return unwrap(api.put<ApiResponse<Broker>>(`/brokers/${id}`, data));
  },

  delete(id: number) {
    return unwrap(api.delete<ApiResponse<void>>(`/brokers/${id}`));
  },
};
