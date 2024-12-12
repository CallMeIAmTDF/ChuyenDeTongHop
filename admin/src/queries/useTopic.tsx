import topicApiRequest from "@/apiRequests/topic";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useCreateTopicMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: topicApiRequest.sCreate,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["topics"],
      });
    },
  });
};

export const useEditTopicMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: topicApiRequest.sEdit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topics"] });
      queryClient.invalidateQueries({ queryKey: ["topicById"] });
    },
  });
};

export const useDeleteTopicMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: topicApiRequest.sDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
  });
};

export const useGetAllTopicQuery = (
  spec: IModelSpecificationRequest,
  page: IModelPaginateRequest,
  levelId?: number
) => {
  return useQuery({
    queryKey: ["topics", spec, page, levelId],
    queryFn: () => topicApiRequest.sGetAll(spec, page, levelId),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });
};

export const useGetByIdQuery = (id: number, enabled: boolean) => {
  return useQuery({
    queryKey: ["topicById", id],
    queryFn: () => topicApiRequest.sGetById(id),
    staleTime: 10 * 1000,
    enabled,
  });
};
