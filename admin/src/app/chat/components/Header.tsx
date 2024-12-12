"use client";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUserChat } from "@/types/chat";

export default function HeaderChat({ user }: { user: IUserChat | null }) {
  return (
    <div className="h-full flex items-center">
      <div className="m-[6px] flex w-fit hover:bg-[#e6e7e8] rounded-[8px]">
        <div className="m-2">
          <Avatar className="overflow-hidden rounded-full">
            <AvatarImage
              src={
                user?.image
                  ? process.env.NEXT_PUBLIC_STORAGE_API_ENDPOINT + user.image
                  : "/default_avatar.png"
              }
              alt="avatar"
              className="object-cover"
            />
            <AvatarFallback>I</AvatarFallback>
          </Avatar>
        </div>
        <div className="h-full w-fit p-[6px] flex flex-col justify-center">
          <div className=" font-bold mb-1 text-[14px]">{user?.user_name}</div>
          <div className=" font-normal text-[#65676b] text-[12px]">
            Hoạt động 42 phút trước
          </div>
        </div>
      </div>
    </div>
  );
}
