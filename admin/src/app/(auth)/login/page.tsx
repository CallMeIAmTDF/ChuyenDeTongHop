import LoginForm from "@/app/(auth)/login/login-form";
import Image from "next/image";
import { CheckIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Google from "@/app/(auth)/login/google";
// import Icon from "";

export default function LoginPage() {
  return (
    <div className="flex mt-2 w-full justify-center text-[#121212]">
      <div className=" flex flex-col max-w-[1340px] w-full">
        <div className="flex items-center my-6">
          <h3 className="text-xl font-bold">Chào mừng bạn đến với</h3>
          <Image
            className="pl-2"
            src={"/logo_black.png"}
            width={80}
            height={30}
            alt="Logo"
          />
        </div>
        <div className="flex justify-between w-full gap-[10%] ">
          <div className="flex-[4_4_0%]">
            <div className="mb-4 text-[#414042] text-sm font-normal">
              Bằng việc đăng nhập, bạn đồng ý với các{" "}
              <Link href={"#"} className="text-[#0e2eed]">
                Điều khoản dịch vụ
              </Link>{" "}
              và{" "}
              <Link href={"#"} className="text-[#0e2eed]">
                Chính sách quyền riêng tư
              </Link>{" "}
              của ITviec liên quan đến thông tin riêng tư của bạn.
            </div>
            <Google title={"Đăng nhập bằng Google"}/>
            <div className="relative flex items-center py-4">
              <Separator className="absolute" />
              <div className="relative flex w-full  justify-center  ">
                <span className="bg-background px-3 text-sm">hoặc</span>
              </div>
            </div>
            <LoginForm />
            <div className="flex justify-center my-4">
              Bạn chưa có tài khoản?&nbsp;
              <Link
                href="/register"
                className="text-[#0e2eed] hover:text-[#192fb5]"
              >
                Đăng ký ngay
              </Link>
            </div>
          </div>
          <div className="flex-[5_5_0%] ">
            <h2 className="text-2xl font-bold mb-4">
              Đăng nhập để truy cập ngay vào hàng ngàn đánh giá và dữ liệu lương
              thị trường IT
            </h2>
            <ul className="text-base font-normal space-y-4">
              <li className="flex">
                <CheckIcon color="#0ab305" width={25} height={25} />
                Xem trước mức lương để có thể lợi thế khi thoả thuận lương
              </li>
              <li className="flex">
                <CheckIcon
                  fontWeight={400}
                  color="#0ab305"
                  width={25}
                  height={25}
                />
                Tìm hiểu về phúc lợi, con người, văn hóa công ty qua các đánh
                giá chân thật
              </li>
              <li className="flex">
                <CheckIcon color="#0ab305" width={25} height={25} />
                Dễ dàng ứng tuyển chỉ với một thao tác
              </li>
              <li className="flex">
                <CheckIcon color="#0ab305" width={25} height={25} /> Quản lý hồ
                sơ và quyền riêng tư của bạn
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
