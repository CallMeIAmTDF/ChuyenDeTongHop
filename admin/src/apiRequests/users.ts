import http from "@/utils/api";
import { ForgotPasswordBodyType } from "@/schemaValidations/user.schema";
import { UserResponse } from "@/types/user";

const userApiRequest = {
  sForgotPassword: (body: ForgotPasswordBodyType) =>
    http.post<IBackendRes<any>>("/users/forgotPassword", body),

  sGetById: (id: string) => http.get<IBackendRes<UserResponse>>(`users/${id}`),

  sGetAll: (
    spec: IModelSpecificationRequest,
    page: IModelPaginateRequest,
  ) =>
    http.get<IBackendRes<IModelPaginate<UserResponse>>>(`users?page=${
      page.page
    }&size=${page.size}&sort=${page.sort}
    ${"&filter=" + spec.filter} `),
};

export default userApiRequest;
