import wordApiRequest from "@/apiRequests/word";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useCreateWordMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: wordApiRequest.sCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["words"],
      });
    },
  });
};

export const useEditWordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: wordApiRequest.sEdit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["words"] });
      queryClient.invalidateQueries({ queryKey: ["wordById"] });
    },
  });
};

export const useDeleteWordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: wordApiRequest.sDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["words"] });
    },
  });
};

export const useGetAllWordQuery = (
  spec: IModelSpecificationRequest,
  page: IModelPaginateRequest,
  topicId: number
) => {
  return useQuery({
    queryKey: ["words", spec, page, topicId],
    queryFn: () => wordApiRequest.sGetAll(spec, page, topicId),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });
};

export const useGetByIdQuery = (id: number, enabled: boolean) => {
  return useQuery({
    queryKey: ["wordById", id],
    queryFn: () => wordApiRequest.sGetById(id),
    staleTime: 10 * 1000,
    enabled,
  });
};
