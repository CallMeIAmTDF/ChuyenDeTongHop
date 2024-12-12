"use client";
import authApiRequest from "@/apiRequests/auth";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

enum types {
  Success = "success",
  Failed = "failed",
  Timeout = "timeout",
}

export default function VerifyEmail() {
  const router = useRouter();
  const [type, setType] = useState(types.Success);

  useEffect(() => {
    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);
    const authCode = isMatch ? isMatch[1] : "";

    if (!isMatch) {
      router.push("/login");
    }

    async function verify(authCode: string) {
      const res = await authApiRequest.verifyRegister(authCode);

      if (res.payload.code === 200) {
        return
      } else if (res.payload.code === 1005) {
        setType(types.Timeout);
      } else if (res.payload.code === 400) {
        setType(types.Failed);
      } else {
        toast({
          variant: "destructive",
          title: "Có lỗi xẩy ra!",
        });
        router.push("/login");
      }
    }

    verify(authCode);
  }, []);

  return (
    <>
      {type === types.Success ? (
        <div className="w-full flex justify-center h-screen items-center">
        <div className=" max-w-7xl p-6 w-full flex items-center flex-col">
          <Image
            src="/robby-subscription.svg"
            alt="Robby Subscription"
            width={160}
            height={160}
          />
          <h2 className="text-3xl font-bold mt-4 mb-6">
              Xác nhận email thành công
          </h2>

          <p className="text-[16px]">
              Email xác nhận thành công. Vui lòng đăng nhập để tiếp tục sử dụng.
          </p>
        </div>
      </div>
      ) :  (
        <div className="w-full flex justify-center h-screen items-center">
          <div className=" max-w-7xl p-6 w-full flex items-center flex-col">
            <Image
              src="/robby-subscription.svg"
              alt="Robby Subscription"
              width={160}
              height={160}
            />
            <h2 className="text-3xl font-bold mt-4 mb-6">
              {type === types.Failed
                ? "Xác nhận email không chính xác"
                : type === types.Timeout
                ? "Mã xác nhận email đã hết hạn"
                : "Xác nhận địa chỉ email"}
            </h2>

            <p className="text-[16px]">
              {type === types.Failed
                ? "Email xác nhận không chính xác. Bấm đăng ký để tạo lại tài khoản."
                : "Email xác nhận đã hết hạn. Bấm đăng ký để tạo lại tài khoản."}
            </p>

            <Button
              className="w-fit mt-2 px-6 h-11 border-[#ed1b2f] text-[#ed1b2f] font-semibold text-[16px] hover:bg-[#fff5f5] hover:text-[#ed1b2f] select-none "
              variant="outline"
            >
              <Link href={"/register"}>Đăng ký</Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
