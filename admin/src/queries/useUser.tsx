import userApiRequest from "@/apiRequests/users";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetAllUserQuery = (
  spec: IModelSpecificationRequest,
  page: IModelPaginateRequest
) => {
  return useQuery({
    queryKey: ["users", spec, page],
    queryFn: () => userApiRequest.sGetAll(spec, page),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });
};

export const useGetByIdQuery = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["userById", id],
    queryFn: () => userApiRequest.sGetById(id),
    staleTime: 10 * 1000,
    enabled,
  });
};
