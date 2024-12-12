import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { getAccessTokenFormLocalStorage } from "@/lib/utils";
import { IMessageRequest } from "@/types/chat";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
let stompClient: CompatClient | null = null;
let socket: any = null;

export const connectToAdminChat = (
  onMessageReceived: (message: any) => void
) => {
  if (socket != null) return;

  socket = new SockJS(API_ENDPOINT + "/chat");
  stompClient = Stomp.over(socket);
  if (!socket.OPEN) {
    stompClient.connect(
      { token: getAccessTokenFormLocalStorage() },
      function (frame: any) {
        setTimeout(function () {
          stompClient!.subscribe(
            "/topic/admin",
            (messageOutput: any) => {
              const message = JSON.parse(messageOutput.body);
              onMessageReceived(message);
            },
            { token: getAccessTokenFormLocalStorage() ?? "" }
          );
        }, 500);
      }
    );
  }
};
export const connectToUserChat = (
  onMessageReceived: (message: any) => void,
  userId: string
) => {
  if (socket != null) return;

  socket = new SockJS(API_ENDPOINT + "/chat");

  stompClient = Stomp.over(socket);
  if (!socket.OPEN) {
    stompClient.connect(
      { token: getAccessTokenFormLocalStorage() },
      function (frame: any) {
        setTimeout(() => {
          stompClient!.subscribe(
            "/topic/user/" + userId,
            (messageOutput: any) => {
              const message = JSON.parse(messageOutput.body);
              onMessageReceived(message);
            },
            { token: getAccessTokenFormLocalStorage() ?? "" }
          );
        }, 500);
      }
    );
  }
  // setupSocketDisconnectOnUnload(stompClient);
};
export const sendMessageToUser = (userId: string, chatMessage: IMessageRequest) => {
  console.log("🚀 ~ sendMessageToUser ~ chatMessage:", chatMessage)
  if (stompClient && userId) {
    stompClient.send(
      "/app/adminToUser/" + userId,
      { token: getAccessTokenFormLocalStorage() },
      JSON.stringify(chatMessage)
    );
  }
};

export const sendMessageToAdmin = (userId: string, chatMessage: IMessageRequest) => {
  if (stompClient ) {
    stompClient.send(
      "/app/userToAdmin/" + userId,
      { token: getAccessTokenFormLocalStorage() },
      JSON.stringify(chatMessage)
    );
  }
};
