import {
  TopicCreateRequest,
  TopicEditRequest,
  TopicResponse,
} from "@/types/topic";
import http from "@/utils/api";

const topicApiRequest = {
  sGetById: (id: number) =>
    http.get<IBackendRes<TopicResponse>>(`topics/${id}`),

  sGetAll: (spec: IModelSpecificationRequest, page: IModelPaginateRequest, levelId?: number) =>
    http.get<IBackendRes<IModelPaginate<TopicResponse>>>(`topics?page=${
      page.page
    }&size=${page.size}&sort=${page.sort}
    ${"&filter=" + spec.filter} ${levelId ? "&levelId=" + levelId : ""} `),

  sCreate: (body: TopicCreateRequest) =>
    http.post<IBackendRes<TopicResponse>>("topics", body),

  sEdit: (body: TopicEditRequest) =>
    http.put<IBackendRes<TopicResponse>>("topics", body),

  sDelete: (id: number) =>
    http.delete<IBackendRes<TopicResponse>>(`topics/${id}`, {}),
};

export default topicApiRequest;
