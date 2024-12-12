import React, { useState, useEffect, useRef } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Animated, FlatList } from 'react-native';
import { GiftedChat, IMessage, InputToolbar, MessageText } from 'react-native-gifted-chat';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { getServerIpAddress, getTokenAuthor } from '@/app/(tabs)/data';
import apiClient from "../../app/(tabs)/bearerToken";
export interface CustomMessage extends IMessage {
  replyTo?: {
    _id: any,
    text: string;
    user: {
      _id: string;
      name: string;
    };
  } | null;
}
const decodeBinaryBody = (binaryBody: number[]): string => {
  const textDecoder = new TextDecoder();
  return JSON.parse(textDecoder.decode(new Uint8Array(binaryBody)));
};
const decodeJWT = (token: string) => {
  if (token) {
    const [header, payload, signature] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return decodedPayload;
  }
  else {
    return { "uid": "" }
  }
};

// const MESSAGE_API = `http://${getServerIpAddress()}:8080/words/test`

interface ChatScreenProps {
  onBack: () => void;
}
const ChatScreen: React.FC<ChatScreenProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<CustomMessage[]>([]);
  const [replyMessage, setReplyMessage] = useState<CustomMessage | null>(null);
  const [stomp, setStomp] = useState<CompatClient | null>(null);
  const chatRef = useRef<FlatList<CustomMessage | undefined>>(null);
  let stompClient: CompatClient | null = null;
  let socket: any = null;

  const mapChatResponseToMessage = (chatResponse: any): CustomMessage => {
    const isUserSender = chatResponse.sender_type === 'USER';
    return {
      _id: chatResponse.id,
      text: chatResponse.message,
      createdAt: new Date(chatResponse.timestamp),
      user: {
        _id: isUserSender ? chatResponse.user_id : chatResponse.admin_id,
        name: isUserSender ? 'You' : 'Admin',
      },
      replyTo: chatResponse.reply
        ? {
          _id: chatResponse.reply.id,
          text: chatResponse.reply.message,
          user: {
            _id: chatResponse.reply.sender_id,
            name: chatResponse.reply.sender_id === chatResponse.user_id ? 'You' : 'Admin'
          },
        }
        : null,
    };
  }

  const fetchMessages = async () => {

    try {
      const apiInstance = await apiClient();
      const response = await apiInstance.get("/infoChat/getMessagesForUser");
      const data: CustomMessage[] = await response.data.data;
      console.log({ "data ": data })
      setMessages(data.reverse());
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };


  useEffect(() => {
    console.warn = () => { }
    fetchMessages();
    const SOCKET_URL = `http://${getServerIpAddress()}:8080/chat`;
    const USER_ID = decodeJWT(getTokenAuthor())["uid"]; // uid
    const TOKEN = getTokenAuthor();
    if (socket == null && stomp == null && stompClient == null) {
      socket = new SockJS(SOCKET_URL);
      stompClient = Stomp.over(socket);
      stompClient.debug = () => { }
      console.warn = () => { }
      if (!socket.OPEN) {
        stompClient.connect(
          { token: TOKEN },
          function (frame: any) {
            setTimeout(function () {
              setStomp(stompClient);
              stompClient!.subscribe(
                `/topic/user/${USER_ID}`,
                (messageOutput: any) => {
                  const message = decodeBinaryBody(messageOutput["_binaryBody"]);
                  const newMessage = mapChatResponseToMessage(message);
                  console.log({ "message": message, "newMessage": newMessage })
                  setMessages((prevMessages) => [newMessage, ...prevMessages,]);
                },
                { token: TOKEN }
              );
            }, 500);
          }
        );
      }
    }
  }, []);
  const onSend = (newMessages: CustomMessage[]) => {
    const messageToSend = newMessages[0];
    const messageRequest = {
      access_token: getTokenAuthor(),
      message: messageToSend.text,
      id: replyMessage ? replyMessage._id : 0,
      type: replyMessage ? 'REPLY' : 'SENT',
    };
    if (stomp && stomp.connected) {
      stomp.send(
        "/app/userToAdmin/" + decodeJWT(getTokenAuthor())["uid"],
        { token: getTokenAuthor() },
        JSON.stringify(messageRequest)
      );
    }
    setReplyMessage(null);
  };
  const scrollToReply = (id: number) => {
    const item = messages.find((msg) => msg._id === id);
    console.log(item)
    if (chatRef && chatRef.current) {
      chatRef.current.scrollToItem({ animated: true, item: item, viewPosition: 0.2 })
    }
  }
  const renderBubble = (props: any) => {
    const { currentMessage } = props;
    const translateX = new Animated.Value(0);
    const handleGestureEvent = Animated.event(
      [{ nativeEvent: { translationX: translateX } }],
      { useNativeDriver: false }
    );

    const determineContainerStyle = () => {
      if (currentMessage.user._id === decodeJWT(getTokenAuthor())["uid"]) {
        return {
          backgroundColor: '#c7e0ff',
        };
      } else {
        return {
          backgroundColor: '#ffffff',
        };
      }
    };

    const handleStateChange = (event: any) => {
      if (event.nativeEvent.state === State.END) {
        if (event.nativeEvent.translationX > 50 || event.nativeEvent.translationX < -50) {
          setReplyMessage(currentMessage);
        }
        Animated.timing(translateX, {
          toValue: 0,
          duration: 150,
          useNativeDriver: false,
        }).start();
      }
    };

    return (
      <PanGestureHandler
        onGestureEvent={handleGestureEvent}
        onHandlerStateChange={handleStateChange}
      >
        <Animated.View style={[{ transform: [{ translateX }] }, determineContainerStyle(), styles.messengerItem]}>
          {currentMessage.replyTo && currentMessage.replyTo.text ? (
            <TouchableOpacity style={[styles.replyBubble]} onPress={() => scrollToReply(currentMessage.replyTo._id)}>
              <Text style={styles.replyUser}>{currentMessage.replyTo.user.name}:</Text>
              <Text style={styles.replyText}>{currentMessage.replyTo.text}</Text>
            </TouchableOpacity>
          ) : null}
          <View style={[styles.bubbleContainer]}>
            {/* , styles.bubbleRight */}
            <Text style={styles.label}>{currentMessage.text}</Text>
          </View>

        </Animated.View>
      </PanGestureHandler>
    );
  };

  const renderInputToolbar = (props: any) => (
    <View>
      {replyMessage && (
        <View style={styles.replyContainer}>
          <Text style={styles.replyLabel}>Replying to {replyMessage.user.name}</Text>
          <Text style={styles.replyMessage}>{replyMessage.text}</Text>
          <TouchableOpacity onPress={() => setReplyMessage(null)} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
      <InputToolbar {...props} />
    </View>
  );

  const onLongPress = (context: any, message: IMessage) => {
    setReplyMessage(message);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Ionicons
            name="arrow-back-outline"
            size={30}
            color="#FFFFFF"
            style={{ zIndex: 10, paddingLeft: 10 }}
            onPress={() => {
              onBack();
            }}
          />
          <Text style={styles.headerTitle}>CHAT</Text>
        </View>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: decodeJWT(getTokenAuthor())["uid"],
          }}
          listViewProps={{
            ref: chatRef
          }}
          parsePatterns={(item: any) => [
            {
              type: "url",
              style: {
                textDecorationLine: "none",
                color: '#000000'
              },
              onPress: () => { }
            },
            {
              type: "phone",
              style: {
                color: '#000000'
              },
              onPress: () => { }
            },
            {
              type: "email",
              style: {
                color: '#000000'
              },
              onPress: () => { }
            }
          ]}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          renderAvatar={() => null}
          showAvatarForEveryMessage={true}
          onLongPress={onLongPress}
          renderTime={() => null}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({

  //cả cái tin nhắn
  messengerItem: {
    padding: 5,
    borderRadius: 10,
    margin: 2,
  },
  //màn hình
  container: {
    flex: 1,
    backgroundColor: '#eef0f1',
  },

  // reply
  replyContainer: {
    backgroundColor: '#e8e8e8',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    position: 'relative',
  },
  replyLabel: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
  },
  replyMessage: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cancelButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  cancelButtonText: {
    color: '#ff3b30',
    fontSize: 12,
  },

  //hiển thị ô reply
  replyBubble: {
    padding: 3,
    borderLeftWidth: 3,
    borderLeftColor: '#0078fe',
    marginEnd: 1,
    marginStart: 2,
    marginTop: 2,
    marginBottom: 3,
  },
  replyUser: { // tên user reply
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
    fontSize: 12,
  },
  replyText: { // nội dung reply
    fontSize: 9,
    color: '#333',
  },

  //Tin nhắn
  bubbleContainer: {
    borderRadius: 10,
    paddingVertical: 2,
    paddingEnd: 5,
    position: 'relative',
    alignSelf: 'flex-start',
  },

  label: {
    color: '#000',
    marginBottom: 2,
  },
  header: {
    height: 55,
    backgroundColor: "#41669C",
    alignItems: "center",
    flexDirection: "row",
  },
  headerTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
    // borderWidth: 1,
    marginEnd: 50,
    textAlign: "center",
  },
});

export default ChatScreen;