import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { distributionApi } from "../api/distribution";
import { DistributionFormValues } from "../schemas/distribution";
import { queryKeys } from "@/lib/query-keys";

export function useDistributions() {
  return useQuery({
    queryKey: queryKeys.distributions.list(),
    queryFn: () => distributionApi.list(),
  });
}

export function useShowDistribution(id: number) {
  return useQuery({
    queryKey: ["distribution", id],
    queryFn: () => {
      if (id !== undefined) 
      return distributionApi.show(id);
    },
    // Highlights: Only fetches if an ID is active and valid
    enabled: !!id, 
  });
}


export function useCreateDistribution() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: distributionApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["distributions"],
      });
    },
  });
}

export function useUpdateDistribution() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: DistributionFormValues }) =>
      distributionApi.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["distributions"],
      });
    },
  });
}

export function useDeleteDistribution() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: distributionApi.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["distributions"],
      });
    },
  });
}
