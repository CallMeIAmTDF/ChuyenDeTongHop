import authApiRequest from "@/apiRequests/auth";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const code = (await request.json()) as string;
  const { payload } = await authApiRequest.sVerifyRegister(code!);

  if (payload.code === 200) {
    return Response.json(payload, {
      status: 200,
    });
  } else {
    return Response.json(payload, {
      status: 400,
    });
  }
}
