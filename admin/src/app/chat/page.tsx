"use client";
import React, { useEffect, useRef, useState } from "react";
import { connectToAdminChat, sendMessageToUser } from "@/utils/SocketService";
import UserList from "@/app/chat/components/UserList";
import ChatBox from "@/app/chat/components/ChatBox";
import chatApiRequest from "@/apiRequests/chat";
import { useGetMessageMutation } from "@/queries/useChat";
import InputContainer from "@/app/chat/components/Input";
import { getAccessTokenFormLocalStorage } from "@/lib/utils";
import HeaderChat from "@/app/chat/components/Header";
import {
  IMessage,
  IMessageRequest,
  IUserChat,
  IUserInChat,
} from "@/types/chat";
import Header from "@/components/header/Header";

interface ChatBoxRef {
  removeReply: () => void;
}

interface InputContainerRef {
  focusInput: () => void;
}

export default function AdminChatPage() {
  const [users, setUsers] = useState<IUserChat[]>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [userInChat, setUserInChat] = useState<IUserInChat[]>([]);
  const [currentUser, setCurrentUser] = useState<IUserChat>();
  const getMessageMutation = useGetMessageMutation();
  const [replyId, setReplyId] = useState<number>(0);
  const chatBoxRef = useRef<ChatBoxRef>(null);
  const inputContainerRef = useRef<InputContainerRef>(null);

  const fetchMessages = (userId: string) => {
    users.length > 0 &&
      setCurrentUser(users.find((user) => user.user_id === userId));
    const fetchRequest = async () => {
      if (getMessageMutation.isPending) return;
      const res = await chatApiRequest.sMessage(userId);
      setMessages(res.payload.data?.messages!);
      setUserInChat(res.payload.data?.users!);
    };
    fetchRequest();
  };

  const handleMessageReceived = async (message: IMessage) => {
    const userRes = await (
      await chatApiRequest.sGetUserByMessageId(message.id)
    ).payload.data;
    if (!userRes) return;

    setMessages((prev) => [...prev, message]);
    setUsers((prevUsers) => {
      const existingUser = prevUsers.find(
        (user) => user.user_id === message.user_id
      );
      const updatedUser: IUserChat = {
        user_id: userRes.user_id,
        user_name: userRes.user_name,
        image: userRes.image,
        admin_id: userRes.admin_id,
        admin_name: userRes.admin_name,
        message: userRes.message,
        sender_type: userRes.sender_type,
        timestamp: userRes.timestamp,
        status: userRes.status,
      };

      const updatedUsers = existingUser
        ? prevUsers.filter((user) => user.user_id !== message.user_id)
        : [...prevUsers];
      return [updatedUser, ...updatedUsers];
    });
  };

  const handleSendMessage = (messageInput: string) => {
    const messageRequest: IMessageRequest = {
      access_token: getAccessTokenFormLocalStorage()!,
      message: messageInput,
      type: replyId === 0 ? "SENT" : "REPLY",
      id: replyId,
    };

    if (messageInput.trim() && currentUser) {
      sendMessageToUser(currentUser.user_id, messageRequest);
      setReplyId(0);
      chatBoxRef.current?.removeReply();
    }
  };

  const fetchRequest = async () => {
    const usersRes = await chatApiRequest.sGetAllUserIdsAndLatestMessage();
    if (usersRes.payload.data!.length > 0) {
      setUsers(usersRes.payload.data!);
      setCurrentUser(usersRes.payload.data![0]);
      fetchMessages(usersRes.payload.data![0].user_id!);
    }
  };

  const handlerSetReplyId = (id: number) => {
    setReplyId(id);
    inputContainerRef.current?.focusInput();
  };

  useEffect(() => {
    fetchRequest();
    connectToAdminChat(handleMessageReceived);
  }, []);

  return (
    <>
      <Header />
      <div className="flex h-[calc(100vh-64px)] bg-gray-100">
        <div className="flex-1 max-w-[360px]">
          <UserList users={users} onSelectUser={fetchMessages} />
        </div>
        <div className="flex-1 flex-col mr-2 ">
          <div className=" h-[64px] w-full">
            <HeaderChat user={currentUser ?? null} />
          </div>
          <div className="h-[calc(100vh-64px-64px-56px)]">
            <ChatBox
              ref={chatBoxRef}
              messages={messages}
              userInChat={userInChat}
              role={"ADMIN"}
              setReplyId={handlerSetReplyId}
            />
          </div>
          <div className=" h-[56px] flex items-center">
            <InputContainer
              ref={inputContainerRef}
              handleSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
}
