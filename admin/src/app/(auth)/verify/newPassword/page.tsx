import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type Props = {
  searchParams: { email: string; type: types };
};

enum types {
  Success = "success",
  Failed = "failed",
  Timeout = "timeout",
}

export default function VerifyEmail({ searchParams }: Props) {
  return (
    <div className="w-full flex justify-center h-screen items-center">
      <div className=" max-w-7xl p-6 w-full flex items-center flex-col">
        <Image
          src={"/robby-subscription.svg"}
          alt="Robby Subscription"
          width={160}
          height={160}
        />
        <h2 className="text-3xl font-bold mt-4 mb-6">
          {searchParams.type === types.Success
            ? "Email xác nhận thành công"
            : searchParams.type === types.Failed
            ? "Email xác nhận không chính xác"
            : searchParams.type === types.Timeout
            ? "Email xác nhận đã hết hạn"
            : "Xác nhận địa chỉ email"}
        </h2>

        {[types.Success, types.Failed, types.Timeout].some(
          (t) => t === searchParams.type
        ) ? (
          <>
            <p className="text-[16px]">
              {searchParams.type === types.Success
                ? "Email xác nhận thành công. Bấm đăng nhập để tiếp tục truy cập."
                : searchParams.type === types.Failed
                ? "Email xác nhận không chính xác. Bấm đăng ký để tạo lại tài khoản."
                : "Email xác nhận đã hết hạn. Bấm đăng ký để tạo lại tài khoản."}
            </p>
            <Button
              className="w-fit mt-2 px-6 h-11 border-[#ed1b2f] text-[#ed1b2f] font-semibold text-[16px] hover:bg-[#fff5f5] hover:text-[#ed1b2f] select-none "
              variant="outline"
            >
              <Link href= {searchParams.type === types.Success ? "/login" : "/register"}>
                {searchParams.type === types.Success ? "Đăng nhập" : "Đăng ký"}
              </Link>
            </Button>
          </>
        ) : (
          <>
            <p className="text-[16px]">
              Chúng tôi đã gửi email xác nhận đến{" "}
              <strong>{searchParams.email}</strong>
            </p>
            <p className="text-[16px] mb-2">
              Nếu bạn không thấy email nào, vui lòng xem trong thư mục Spam hoặc
              Junk.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
