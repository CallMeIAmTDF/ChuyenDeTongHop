import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { convertToDate } from "@/lib/utils";
import { IUserChat } from "@/types/chat";

interface UserListProps {
  users: IUserChat[];
  onSelectUser: (userId: string) => void;
}
const UserList: React.FC<UserListProps> = ({ users, onSelectUser }) => {
  return (
    <div className="flex flex-col w-full text-[#050505]">
      <h3 className="h-[56px] flex  items-center text-2xl font-bold text-[#050505] p-4">
        Đoạn chat
      </h3>
      <ul className="p-2">
        {users.map((user) => (
          <li
            key={user.user_id}
            onClick={() => onSelectUser(user.user_id)}
            className="h-[68px] w-full   "
          >
            <div className="h-full flex bg-[#dae3f4] rounded-[8px] hover:bg-[#e6e7e8]">
              <div className=" p-[6px]">
                <Avatar className="h-full w-[56px] overflow-hidden rounded-full">
                  <AvatarImage
                    src={
                      user.image
                        ? process.env.NEXT_PUBLIC_STORAGE_API_ENDPOINT +
                          user.image
                        : "/default_avatar.png"
                    }
                    alt="avatar"
                    className="object-cover"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
              <div className="h-full w-fit p-[6px] flex flex-col justify-center">
                <div className=" font-bold mb-1 text-[14px]">
                  {user.user_name}
                </div>
                <div className=" font-normal text-[#65676b] text-[12px]">
                  {user.sender_type === "ADMIN"
                    ? "Bạn"
                    : user.user_name.split(" ").pop()}
                  {": " + user.message}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
