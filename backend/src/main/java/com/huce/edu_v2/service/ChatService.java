package com.huce.edu_v2.service;

import com.huce.edu_v2.dto.request.chat.MessageRequest;
import com.huce.edu_v2.dto.response.chat.ChatResponse;
import com.huce.edu_v2.dto.response.chat.ConversationResponse;
import com.huce.edu_v2.dto.response.chat.UserResponse;
import com.huce.edu_v2.dto.response.userChat.ChatResponseForUserChat;

import java.util.List;

public interface ChatService {
	ConversationResponse getMessagesByUserId(String userId);

	UserResponse getUserByMessagesId(Long messagesId);

	List<UserResponse> findAllUserIdsAndLatestMessage();

	ChatResponse sendMessageToUser(String userId, MessageRequest messageRequest);

	ChatResponse sendMessageToAdmin(MessageRequest messageRequest);

	List<ChatResponseForUserChat> getMessageByUserId(String userId);

	ChatResponse sendMessageBot(String userId, String newMessage, Long replyId);
}