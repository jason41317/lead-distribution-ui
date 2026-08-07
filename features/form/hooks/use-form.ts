import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formApi } from "../api/form";
import { FormFormValues } from "../schemas/form";
import { queryKeys } from "@/lib/query-keys";

export function useForms(enabled = true) {
  return useQuery({
    queryKey: queryKeys.forms.list(),
    queryFn: () => formApi.list(),
    enabled
  });
}

export function usePublicForm(slug: string) {
  return useQuery({
    queryKey: ["forms-slug", slug],

    queryFn: () => formApi.getBySlug(slug),

    enabled: !!slug,
  });
}

export function useCreateForm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: formApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["forms"],
      });
    },
  });
}

export function useUpdateForm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormFormValues }) =>
      formApi.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["forms"],
      });
    },
  });
}

export function useDeleteForm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: formApi.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["forms"],
      });
    },
  });
}
