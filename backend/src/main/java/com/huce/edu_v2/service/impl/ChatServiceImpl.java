package com.huce.edu_v2.service.impl;

import com.huce.edu_v2.advice.exception.ResourceNotFoundException;
import com.huce.edu_v2.dto.mapper.ChatMapper;
import com.huce.edu_v2.dto.request.chat.MessageRequest;
import com.huce.edu_v2.dto.response.chat.ChatResponse;
import com.huce.edu_v2.dto.response.chat.ConversationResponse;
import com.huce.edu_v2.dto.response.chat.UserInChat;
import com.huce.edu_v2.dto.response.chat.UserResponse;
import com.huce.edu_v2.dto.response.userChat.ChatResponseForUserChat;
import com.huce.edu_v2.entity.Chat;
import com.huce.edu_v2.repository.ChatRepository;
import com.huce.edu_v2.service.ChatService;
import com.huce.edu_v2.util.SecurityUtil;
import com.huce.edu_v2.util.constant.ChatStatusEnum;
import com.huce.edu_v2.util.constant.ChatTypeEnum;
import com.huce.edu_v2.util.constant.SenderType;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChatServiceImpl implements ChatService {
	ChatRepository chatRepository;
	SecurityUtil securityUtil;
	ChatMapper chatMapper;

	@Override
	public ConversationResponse getMessagesByUserId(String userId) {
		Set<String> userIds = new HashSet<>();
		List<ChatResponse> messages = new ArrayList<>();

		chatRepository.findByUserId(userId).forEach(
				chat ->
				{
					ChatResponse chatResponse = chatMapper.toChatResponse(chat);
					messages.add(chatResponse);
					userIds.add(chat.getUserId());

					if (!Objects.equals(chatResponse.getAdminId(), ""))
						userIds.add(chat.getAdminId());

					if (chatResponse.getReply() != null)
						userIds.add(chatResponse.getReply().getSenderId());
				}
		);

		List<UserInChat> users = userIds.stream().map(chatMapper::toUserInChat).toList();

		return ConversationResponse.builder()
				.users(users)
				.messages(messages)
				.build();
	}

	@Override
	public UserResponse getUserByMessagesId(Long messagesId) {
		Chat chat = chatRepository.findById(messagesId).orElseThrow(
				() -> new ResourceNotFoundException("ChatEntity", "id", messagesId)
		);

		return chatMapper.toUserResponse(chat);
	}

	@Override
	public List<UserResponse> findAllUserIdsAndLatestMessage() {
		List<Object[]> res = chatRepository.findAllUserIdsAndLatestMessage();
		List<UserResponse> allUserIdAndLatestMessage = new ArrayList<>();

		res.forEach(t -> chatRepository.findById((Long) t[0]).ifPresent(chat -> allUserIdAndLatestMessage.add(chatMapper.toUserResponse(chat))));

		return allUserIdAndLatestMessage;
	}

	@SneakyThrows
	@Override
	public ChatResponse sendMessageToUser(String userId, MessageRequest messageRequest) {
		String adminIdByToken = securityUtil.getUuid(SignedJWT.parse(messageRequest.getAccessToken()));

		if (!messageRequest.getType().equals(ChatTypeEnum.DELETE)){
		Chat newChat = chatRepository.save(Chat.builder()
				.senderType(SenderType.ADMIN)
				.userId(userId)
				.adminId(adminIdByToken)
				.message(messageRequest.getMessage())
				.status(ChatStatusEnum.SENT)
				.replyId(messageRequest.getType().equals(ChatTypeEnum.REPLY) ? messageRequest.getId() : null)
				.build());

			return chatMapper.toChatResponse(newChat);

		}

		Chat chatRemove = chatRepository.findById(messageRequest.getId()).orElseThrow(
				() -> new ResourceNotFoundException("Chat", "chatId", messageRequest.getId())
		);

		chatRemove.setMessage("");

		return ChatResponse.builder()
				.id(chatRemove.getId())
				.type(ChatTypeEnum.DELETE)
				.build();
	}

	@SneakyThrows
	@Override
	public ChatResponse sendMessageToAdmin(MessageRequest messageRequest) {
		String uidByToken = securityUtil.getUuid(SignedJWT.parse(messageRequest.getAccessToken()));

		Chat newChat = chatRepository.save(Chat.builder()
				.senderType(SenderType.USER)
				.userId(uidByToken)
				.adminId("")
				.message(messageRequest.getMessage())
				.status(ChatStatusEnum.SENT)
				.replyId(messageRequest.getType().equals(ChatTypeEnum.REPLY) ? messageRequest.getId() : null)
				.build());

		return chatMapper.toChatResponse(newChat);
	}

	@Override
	@SneakyThrows
	public List<ChatResponseForUserChat> getMessageByUserId(String userId) {
		List<Chat> chatMessages = chatRepository.findByUserId(userId);
		List<Chat> allMessages = new ArrayList<>(chatMessages);
		List<ChatResponseForUserChat> res = new ArrayList<>();
		allMessages.forEach(mess -> res.add(chatMapper.toChatResponseForUserChat(mess)));
		return res;
	}

	@Override
	public ChatResponse sendMessageBot(String userId, String newMessage, Long replyId) {
		Chat chat = chatRepository.save(Chat.builder()
				.senderType(SenderType.ADMIN)
				.userId(userId)
				.adminId("0")
				.message(newMessage)
				.status(ChatStatusEnum.SENT)
				.replyId(replyId)
				.build());
		return chatMapper.toChatResponse(chat);
	}
}
