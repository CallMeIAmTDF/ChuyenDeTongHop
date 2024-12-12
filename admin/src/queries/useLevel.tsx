import levelApiRequest from "@/apiRequests/level";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useCreateLevelMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: levelApiRequest.sCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["levels"],
      });
    },
  });
};

export const useEditLevelMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: levelApiRequest.sEdit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["levels"] });
      queryClient.invalidateQueries({ queryKey: ["levelById"] });
    },
  });
};

export const useDeleteLevelMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: levelApiRequest.sDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["levels"] });
    },
  });
};

export const useGetAllLevelQuery = (
  spec: IModelSpecificationRequest,
  page: IModelPaginateRequest
) => {
  return useQuery({
    queryKey: ["levels", spec, page],
    queryFn: () => levelApiRequest.sGetAll(spec, page),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });
};

export const useGetByIdQuery = (id: number, enabled: boolean) => {
  return useQuery({
    queryKey: ["levelById", id],
    queryFn: () => levelApiRequest.sGetById(id),
    staleTime: 10 * 1000,
    enabled,
  });
};
