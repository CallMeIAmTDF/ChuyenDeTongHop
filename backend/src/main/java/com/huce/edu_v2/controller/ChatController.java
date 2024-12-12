package com.huce.edu_v2.controller;

import com.huce.edu_v2.dto.ApiResponse;
import com.huce.edu_v2.dto.response.chat.ConversationResponse;
import com.huce.edu_v2.dto.response.chat.UserResponse;
import com.huce.edu_v2.dto.response.userChat.ChatResponseForUserChat;
import com.huce.edu_v2.entity.User;
import com.huce.edu_v2.service.ChatService;
import com.huce.edu_v2.service.UserService;
import com.huce.edu_v2.util.SecurityUtil;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/infoChat")
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChatController {
	ChatService chatService;
	UserService userService;
	SecurityUtil securityUtil;

	@GetMapping("/users/getAllUserIdsAndLatestMessage")
	public ApiResponse<List<UserResponse>> getAllUserIdsAndLatestMessage(){
		List<UserResponse> res = chatService.findAllUserIdsAndLatestMessage();
		return ApiResponse.<List<UserResponse>>builder()
				.code(HttpStatus.OK.value())
				.message("Fetch all userIds and latest message")
				.data(res)
				.build();
	}

	@GetMapping("/messages/{userId}")
	public ApiResponse<ConversationResponse> getMessagesByUserId(@PathVariable String userId) {
		return ApiResponse.<ConversationResponse>builder()
				.code(HttpStatus.OK.value())
				.message("Fetch all message by userid")
				.data(chatService.getMessagesByUserId(userId))
				.build();
	}

	@GetMapping("/users/{messageId}")
	public ApiResponse<UserResponse> getUserByMessagesId(@PathVariable Long messageId) {
		UserResponse user = chatService.getUserByMessagesId(messageId);
		return ApiResponse.<UserResponse>builder()
				.code(HttpStatus.OK.value())
				.message("Fetch all message by userid")
				.data(user)
				.build();
	}
	@GetMapping("/getMessagesForUser")
	public ApiResponse<List<ChatResponseForUserChat>> getMessagesForUser(){
		User user = userService.fetchUserByEmail(securityUtil.getCurrentUserLogin().orElse(null));
		return ApiResponse.<List<ChatResponseForUserChat>>builder()
				.code(HttpStatus.OK.value())
				.message("Fetch all user messages")
				.data(chatService.getMessageByUserId(user.getId()))
				.build();
	}
}