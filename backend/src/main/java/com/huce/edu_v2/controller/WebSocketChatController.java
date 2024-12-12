package com.huce.edu_v2.controller;

import com.huce.edu_v2.dto.request.chat.MessageRequest;
import com.huce.edu_v2.dto.response.chat.ChatResponse;
import com.huce.edu_v2.entity.WordDict;
import com.huce.edu_v2.service.ChatService;
import com.huce.edu_v2.service.DictionaryService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.experimental.FieldDefaults;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import java.util.Arrays;
import java.util.regex.Pattern;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WebSocketChatController {
	SimpMessagingTemplate messagingTemplate;
	ChatService chatService;
	DictionaryService dictionaryService;

	@MessageMapping("/userToAdmin/{userId}")
//	@SendTo("/topic/admin")
	public void sendToAdmin(@DestinationVariable String userId, MessageRequest messageRequest) {
//		return chatService.sendMessageToAdmin(messageRequest);
		ChatResponse chatResponse = chatService.sendMessageToAdmin(messageRequest);
		messagingTemplate.convertAndSend("/topic/user/" + userId, chatResponse);
		messagingTemplate.convertAndSend("/topic/admin", chatResponse);
		if(Pattern.matches("^/(translate|tratu|dich|mean).+", messageRequest.getMessage())){
			String[] parts = messageRequest.getMessage().split(" ");
			String word = String.join(" ", Arrays.copyOfRange(parts, 1, parts.length));
			if (parts.length > 1) {
				String newMessage = "Không tồn tại từ này trong kho dữ liệu";
				WordDict w = dictionaryService.traslate(word);
				if(w != null){
					newMessage = w.toString();
				}
				Long replyId = chatResponse.getId();
				ChatResponse c = chatService.sendMessageBot(userId, newMessage, replyId);
				messagingTemplate.convertAndSend("/topic/user/" + userId, c);
				messagingTemplate.convertAndSend("/topic/admin", c);
			}
		}

	}

	@SneakyThrows
    @MessageMapping("/adminToUser/{userId}")
	public void sendToUser(@DestinationVariable String userId, MessageRequest messageRequest) {
		ChatResponse chatResponse = chatService.sendMessageToUser(userId, messageRequest);
		messagingTemplate.convertAndSend("/topic/user/" + userId, chatResponse);
		messagingTemplate.convertAndSend("/topic/admin", chatResponse);
	}
}