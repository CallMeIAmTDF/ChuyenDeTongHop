package com.huce.edu_v2.dto.response.userChat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ChatResponseForUserChat {
	private Long _id;
	private String text;
	private LocalDateTime createdAt;
	private UserResponseForUserChat user;
	private ReplyResponseForUserChat replyTo;
}
