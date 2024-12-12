"use client";

import Google from "@/app/(auth)/login/google";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useState } from "react";

export default function TermsGoogle() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <label

        htmlFor="term"
        className="my-4 text-[#414042] text-[16px] font-medium cursor-pointer inline-block group select-none"
      >
        <div
          className={
            isChecked
              ? "inline-flex h-12 w-12 items-center justify-center rounded-full group-hover:bg-[#cb4040] group-hover:bg-opacity-20"
              : "inline-flex h-12 w-12 items-center justify-center rounded-full group-hover:bg-[#a6a6a6] group-hover:bg-opacity-20"
          }
        >
          <Checkbox
            onCheckedChange={() => {
              setIsChecked(!isChecked);
            }}
            id="term"
            className={
              isChecked
                ? "data-[state=checked]:bg-primary[data-state=checked] w-6 h-6 border-red-600 border-2 bg-red-600"
                : "w-6 h-6  border-2"
            }
          />
        </div>
        {/* <label htmlFor="aâ"></label> */}
        Bằng việc đăng ký bằng tài khoản Google, bạn đồng ý với các{" "}
        <Link href={"#"} className="text-[#0e2eed]">
          Điều khoản dịch vụ
        </Link>{" "}
        và{" "}
        <Link href={"#"} className="text-[#0e2eed]">
          Chính sách quyền riêng tư
        </Link>{" "}
        của ITviec liên quan đến thông tin riêng tư của bạn.
      </label>
      <Google title={"Đăng ký bằng Google"} disable={!isChecked} />
    </>
  );
}
