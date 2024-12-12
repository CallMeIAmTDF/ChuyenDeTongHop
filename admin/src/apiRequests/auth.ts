import http from "@/utils/api";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import { NewPasswordReq } from "@/schemaValidations/user.schema";

const authApiRequest = {
  refreshTokenRequest: null as Promise<{
    status: number,
    payload: IBackendRes<LoginResType>
  }> | null,

  sLogin: (body: LoginBodyType) =>
    http.post<IBackendRes<LoginResType>>("/auth/login", body),

  login: (body: LoginBodyType) =>
    http.post<IBackendRes<LoginResType>>("/api/auth/login", body, {
      baseUrl: "",
    }),

  sOutbound: (code: string) =>
    http.post<IBackendRes<LoginResType>>(
      `/auth/outbound/authentication?code=${code}`,
      null
    ),

  outbound: (code: string) =>
    http.post("/api/auth/outbound", code, {
      baseUrl: "",
    }),

  sVerifyRegister: (code: string) =>
    http.get<IBackendRes<LoginResType>>(`/auth/verifyRegister?code=${code}`),

  verifyRegister: (code: string) =>
    http.post<IBackendRes<LoginResType>>("/api/auth/verify/register", code, {
      baseUrl: "",
    }),

  sVerifyNewPassword: (body: NewPasswordReq) =>
    http.post<IBackendRes<LoginResType>>(`/auth/verifyForgotPassword`, body),

  verifyNewPassword: (body: NewPasswordReq) =>
    http.post<IBackendRes<LoginResType>>("/api/auth/verify/newPassword", body, {
      baseUrl: "",
    }),

  sLogout: (refresh_token: string) =>
    http.post<IBackendRes<any>>(
      "/auth/logout",
      {},
      {
        headers: { Cookie: `refresh_token=${refresh_token}` },
      }
    ),

  logout: () =>
    http.post<IBackendRes<any>>(
      "/api/auth/logout",
      {},
      {
        baseUrl: "",
      }
    ),

  sRegister: (body: RegisterBodyType) =>
    http.post<IBackendRes<any>>("/auth/register", body),

  async refreshToken() {
    if (this.refreshTokenRequest) {
      return this.refreshTokenRequest;
    }
    this.refreshTokenRequest = http.post<IBackendRes<LoginResType>>(
      "/api/auth/refresh-token",
      {},
      {
        baseUrl: "",
      }
    )
    const result = await this.refreshTokenRequest
    this.refreshTokenRequest = null
    return result
  },

  sRefreshToken: (refreshToken: string) =>
    http.post<IBackendRes<LoginResType>>(
      "/auth/refreshToken",
      {},
      {
        headers: { Cookie: `refresh_token=${refreshToken}` },
      }
    ),
};

export default authApiRequest;
