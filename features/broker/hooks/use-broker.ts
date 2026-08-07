import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BrokerFilters } from "../types/broker";
import { brokerApi } from "../api/broker";
import { BrokerFormValues } from "../schemas/broker";
import { queryKeys } from "@/lib/query-keys";

export function useBrokers(filters: BrokerFilters) {
  return useQuery({
    queryKey: queryKeys.brokers.list(filters),
    queryFn: () => brokerApi.list(filters),
  });
}

export function useCreateBroker() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: brokerApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["brokers"],
      });
    },
  });
}

export function useUpdateBroker() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: BrokerFormValues }) =>
      brokerApi.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["brokers"],
      });
    },
  });
}

export function useDeleteBroker() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: brokerApi.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["brokers"],
      });
    },
  });
}
