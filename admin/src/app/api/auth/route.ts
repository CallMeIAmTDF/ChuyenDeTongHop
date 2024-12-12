import { LoginResType } from "@/schemaValidations/auth.schema";
import { decodeJWT } from "@/lib/utils";
import { cookies } from "next/headers";
import { HttpError } from "@/utils/api";

export async function POST(request: Request) {
  const res: IBackendRes<LoginResType> = await request.json();
  const { access_token, refresh_token } = res.data!;
  const cookieStore = cookies();

  if (!access_token || !refresh_token) {
    return Response.json(
      { message: "Không nhận được access token, refresh token" },
      {
        status: 400,
      }
    );
  }
  try {
    const decodedAccessToken = decodeJWT(access_token);
    const decodedRefreshToken = decodeJWT(refresh_token);

    cookieStore.set("accessToken", access_token, {
      path: "/",
      httpOnly: true,
      sameSite: true,
      secure: true,
      expires: new Date(decodedAccessToken.exp * 1000),
    });
    cookieStore.set("refreshToken", refresh_token, {
      path: "/",
      httpOnly: true,
      sameSite: true,
      secure: true,
      expires: new Date(decodedRefreshToken.exp * 1000),
    });
    return Response.json(res, { status: 200 });
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json(
        { message: "Đã có lỗi khi setCookie cho client" },
        {
          status: 500,
        }
      );
    }
  }
}
