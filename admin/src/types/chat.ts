// types/chat.ts

export type IUserChat = {
  user_id: string;
  user_name: string;
  image: string;
  admin_id: string;
  admin_name: string;
  message: string;
  sender_type: string;
  timestamp: string;
  status: string;
};

export type IMessage = {
  id: number;
  user_id: string;
  admin_id: string;
  message: string;
  sender_type: string;
  timestamp: string;
  status: string;
  type: string;
  reply: IReply | null;
};

export type IMessageRequest = {
  access_token: string;
  message: string;
  type: string;
  id: number | null;
};

export type IReply = {
  id: number;
  sender_id: string;
  message: string;
};

export type IUserInChat = {
  user_id: string;
  user_name: string;
  image: string;
};

export type ConversationResponse = {
  users: IUserInChat[];
  messages: IMessage[];
};
