package com.huce.edu_v2.dto.mapper;

import com.huce.edu_v2.advice.exception.ResourceNotFoundException;
import com.huce.edu_v2.dto.response.chat.ChatResponse;
import com.huce.edu_v2.dto.response.chat.ReplyResponse;
import com.huce.edu_v2.dto.response.chat.UserInChat;
import com.huce.edu_v2.dto.response.chat.UserResponse;
import com.huce.edu_v2.dto.response.userChat.ChatResponseForUserChat;
import com.huce.edu_v2.dto.response.userChat.ReplyResponseForUserChat;
import com.huce.edu_v2.dto.response.userChat.UserResponseForUserChat;
import com.huce.edu_v2.entity.Chat;
import com.huce.edu_v2.entity.User;
import com.huce.edu_v2.repository.ChatRepository;
import com.huce.edu_v2.service.UserService;
import com.huce.edu_v2.util.constant.ChatTypeEnum;
import com.huce.edu_v2.util.constant.SenderType;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChatMapper {
    UserService userService;
    ChatRepository chatRepository;

    public ChatResponse toChatResponse(Chat chat) {
        return ChatResponse.builder()
                .id(chat.getId())
                .userId(chat.getUserId())
                .adminId(chat.getAdminId())
                .senderType(chat.getSenderType())
                .message(chat.getMessage())
                .timestamp(chat.getTimestamp())
                .status(chat.getStatus()).type(chat.getReplyId() == null ? ChatTypeEnum.SENT : ChatTypeEnum.REPLY)
                .reply(chat.getReplyId() == null
                        ? null
                        : toReplyResponse(chatRepository.findById(chat.getReplyId())
                                .orElseThrow(() -> new ResourceNotFoundException("Chat", "chatId", chat.getId()))))
                .build();
    }

    public ReplyResponse toReplyResponse(Chat chat) {
        return ReplyResponse.builder()
                .id(chat.getId())
                .senderId(chat.getSenderType() == SenderType.ADMIN ? chat.getAdminId() : chat.getUserId())
                .message(chat.getMessage())
                .build();
    }

    public UserResponse toUserResponse(Chat chat) {
        User user = userService.fetchUserById(chat.getUserId());
        User admin = userService.fetchUserById(chat.getAdminId());

        return UserResponse.builder()
                .userId(user.getId())
                .userName(user.getName())
                .image(user.getImage())
                .adminId(chat.getAdminId())
                .adminName(admin != null ? admin.getName() : "")
                .message(chat.getMessage())
                .senderType(chat.getSenderType())
                .status(chat.getStatus())
                .timestamp(chat.getTimestamp())
                .build();
    }

    public UserInChat toUserInChat(String id) {
        User user = userService.fetchUserById(id);

        return UserInChat.builder()
                .userId(id)
                .userName(user.getName())
                .image(user.getImage())
                .build();
    }

    public ChatResponseForUserChat toChatResponseForUserChat(Chat chatMessage){
        ChatResponseForUserChat dto = new ChatResponseForUserChat();
        dto.set_id(chatMessage.getId());
        dto.setText(chatMessage.getMessage());
        dto.setCreatedAt(chatMessage.getTimestamp());
        if (chatMessage.getSenderType().equals(SenderType.ADMIN)) {
            dto.setUser(new UserResponseForUserChat(chatMessage.getAdminId(), "Admin"));
        }
        else {
            User user = userService.fetchUserById(chatMessage.getUserId());
            dto.setUser(new UserResponseForUserChat(user.getId(), "You"));
        }
        if (chatMessage.getReplyId() != null) {
			chatRepository.findById(chatMessage.getReplyId()).ifPresent(replyMessage -> {
                boolean isAdmin = replyMessage.getSenderType().equals(SenderType.ADMIN);
                dto.setReplyTo(new ReplyResponseForUserChat(
                        replyMessage.getId(),
                        replyMessage.getMessage(),
                        new UserResponseForUserChat(isAdmin ? replyMessage.getAdminId() : replyMessage.getUserId(), isAdmin ? "Admin" : "You")
                ));
            });
		}
        return dto;
    }
}
