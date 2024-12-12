import { WordCreateRequest, WordEditRequest, WordResponse } from "@/types/word";
import http from "@/utils/api";

const wordApiRequest = {
  sGetById: (id: number) => http.get<IBackendRes<WordResponse>>(`words/${id}`),

  sGetAll: (
    spec: IModelSpecificationRequest,
    page: IModelPaginateRequest,
    topicId?: number
  ) =>
    http.get<IBackendRes<IModelPaginate<WordResponse>>>(`words?page=${
      page.page
    }&size=${page.size}&sort=${page.sort}
    ${"&filter=" + spec.filter} ${topicId ? "&topicId=" + topicId : ""} `),

  sCreate: (body: WordCreateRequest) =>
    http.post<IBackendRes<WordResponse>>("words", body),

  sEdit: (body: WordEditRequest) =>
    http.put<IBackendRes<WordResponse>>("words", body),

  sDelete: (id: number) =>
    http.delete<IBackendRes<WordResponse>>(`words/${id}`, {}),
};

export default wordApiRequest;
