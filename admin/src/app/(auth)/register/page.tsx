import LoginForm from "@/app/(auth)/login/login-form";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Google from "@/app/(auth)/login/google";
import { Checkbox } from "@/components/ui/checkbox";
import TermsGoogle from "@/app/(auth)/register/terms";
import RegisterForm from "@/app/(auth)/register/register-form";

// import Icon from "";

export default function RegisterPage() {
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
            <div className="text-3xl font-bold">Đăng ký tài khoản</div>
            <TermsGoogle/>
            {/* <Google title={"Đăng ký bằng Google"} /> */}
            <div className="relative flex items-center py-4">
              <Separator className="absolute" />
              <div className="relative flex w-full  justify-center  ">
                <span className="bg-background px-3 text-sm">hoặc</span>
              </div>
            </div>
            <RegisterForm />
            <div className="flex justify-center my-4">
              Bạn đã có tài khoản?&nbsp;
              <Link
                href="/login"
                className="text-[#0e2eed] hover:text-[#192fb5]"
              >
                Đăng nhập ngay
              </Link>
            </div>
          </div>
          <div className="flex-[5_5_0%] ">
            <div className="flex w-full justify-center h-full items-center">
              <Image
                src={"/robby-login.png"}
                width={320}
                height={310}
                alt="Robby Logo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
