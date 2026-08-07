import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { leadApi } from "../api/lead";
import { LeadFormValues } from "../schemas/lead";
import { queryKeys } from "@/lib/query-keys";
import { LeadFilters } from "../types/lead";

export function useLeads(filters: LeadFilters) {
  return useQuery({
    queryKey: queryKeys.leads.list(filters),
    queryFn: () => leadApi.list(filters),
  });
}

export function useCreateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leadApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leads"],
      });
    },
  });
}

export function useCreateLeadPublic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leadApi.createPublic,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leads"],
      });
    },
  });
}

export function useUpdateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: LeadFormValues }) =>
      leadApi.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leads"],
      });
    },
  });
}

export function useDeleteLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leadApi.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leads"],
      });
    },
  });
}
