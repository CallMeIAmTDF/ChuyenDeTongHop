import { LevelCreateRequest, LevelEditRequest, LevelResponse } from "@/types/level";
import http from "@/utils/api";

const levelApiRequest = {
  sGetById: (id : number) =>
    http.get<IBackendRes<LevelResponse>>(`levels/${id}`),

  sGetAll: (spec : IModelSpecificationRequest, page: IModelPaginateRequest) =>
    http.get<IBackendRes<IModelPaginate<LevelResponse>>>
  (`levels?page=${page.page}&size=${page.size}&sort=${page.sort}
    ${"&filter=" + spec.filter}`),
  
  sCreate: (body : LevelCreateRequest) =>
    http.post<IBackendRes<LevelResponse>>("levels", body),

  sEdit: (body : LevelEditRequest) =>
    http.put<IBackendRes<LevelResponse>>("levels", body),

  sDelete: (id : number) =>
    http.delete<IBackendRes<LevelResponse>>(`levels/${id}`, {}),
};

export default levelApiRequest;
