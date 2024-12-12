"use client";
import { useAppStore } from "@/components/app-provider";
import { AvatarOption } from "@/components/header/Avatar";
import { NavigationMenuDemo } from "@/components/header/Navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const isAuth = useAppStore((state) => state.isAuth);
  const role = useAppStore((state) => state.role);
  console.log("🚀 ~ Header ~ isAuth:", isAuth);
  console.log("🚀 ~ Header ~ role:", role);

  return (
    <header className="sticky top-0 h-16 py-0 px-4 z-50 w-full flex items-center justify-center bg-custom-gradient border-b-[1px] border-solid border-[#ffffff1a]">
      <div className="max-w-[1860px] px-8 w-full h-full flex items-center justify-between">
        <Link href={"/"}>
          <div className="pr-8">
            <Image src={"/logo.png"} width={90} height={40} alt="Logo" />
          </div>
        </Link>
        <div className="flex items-center w-full h-full">
          <div className="flex-1 gap-6 flex justify-end items-center text-white text-base font-medium hover:[&>a]:underline  ">
            {isAuth ? (
              <AvatarOption />
            ) : (
              <Link href={"/login"}>Đăng Nhập/Đăng ký</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
