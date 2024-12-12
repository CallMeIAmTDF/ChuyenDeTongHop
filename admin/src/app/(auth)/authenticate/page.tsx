"use client";
import authApiRequest from "@/apiRequests/auth";
import { useAppStore } from "@/components/app-provider";
import { toast } from "@/hooks/use-toast";
import { decodeJWT, getAccessTokenFormLocalStorage } from "@/lib/utils";
import { useLogoutMutation } from "@/queries/useAuth";
import { LoginResType } from "@/schemaValidations/auth.schema";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect } from "react";

export default function Authentication() {
  const router = useRouter();
  const isCalledRef = React.useRef(false);
  const logoutMutation = useLogoutMutation();


  const setRole = useAppStore((state) => state.setRole);
  const setImage = useAppStore((state) => state.setImage);
  const setName = useAppStore((state) => state.setName);
  const setNoPassword = useAppStore((state) => state.setNoPassword);


  useEffect(() => {
    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);
    const authCode = isMatch ? isMatch[1] : "";

    if (!isMatch) {
      router.push("/login");
    }

    const outbound = async (code: string) => {
      const res = (await authApiRequest.outbound(code)).payload as IBackendRes<LoginResType>;

      if (res.code === 200) {
        toast({
          title: "Đăng nhập thành công bằng Google.",
        });
        const accessToken = getAccessTokenFormLocalStorage();
        if (accessToken) {
          const role = decodeJWT(accessToken).scope;
          if (role !== "ROLE_ADMIN") {
            toast({
              variant: "destructive",
              title: "Chỉ ADMIN mới được vào trang này",
            });
            await logoutMutation.mutateAsync();
          } else {
            toast({ description: "Đăng nhập thành công" });
            const decode = decodeJWT(res.data?.access_token!);
  
            setRole(decode.scope);
            setImage(decode.image);
            setName(decode.name);
            setNoPassword(decode.no_password);

            router.push("/");
          }
        }
      } else {
        toast({
          variant: "destructive",
          title: "Có lỗi xẩy ra!",
        });
        router.push("/login");
      }
    }

    if (isCalledRef.current) return;

    outbound(authCode);
    isCalledRef.current = true;
  }, []);

  return (
    <div className="w-full h-lvh flex flex-col justify-center items-center">
      <Loader2 className="h-[50px] w-[50px] text-blue-600 animate-spin" />
      <div className="mt-4">Authenticate ...</div>
    </div>
  );
}
