import Image from "next/image";
import NewPasswordForm from "@/app/users/password/new/form";


export default function NewPasswordPage() {
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
            <div className="text-3xl font-bold">Quên mật khẩu?</div>
            <div className="mt-6"><NewPasswordForm /></div>
          </div>
          <div className="flex-[5_5_0%] ">
            <div className="flex w-full justify-center h-full items-center">
              <Image
                src={"/robby-sad.png"}
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
