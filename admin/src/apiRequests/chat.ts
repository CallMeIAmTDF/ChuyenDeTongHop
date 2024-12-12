import { IUserChat, ConversationResponse } from "@/types/chat";
import http from "@/utils/api";

const chatApiRequest = {
  sGetAllUserIdsAndLatestMessage: () =>
    http.get<IBackendRes<IUserChat[]>>("infoChat/users/getAllUserIdsAndLatestMessage"),

  sMessage: (userId: string) =>
    http.get<IBackendRes<ConversationResponse>>(`infoChat/messages/${userId}`),

  sGetUserByMessageId: (messageId: number) =>
    http.get<IBackendRes<IUserChat>>(`infoChat/users/${messageId}`),
};

export default chatApiRequest;
