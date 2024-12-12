package com.huce.edu_v2.dto.response.userChat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReplyResponseForUserChat {
	private Long _id;
	private String text;
	private UserResponseForUserChat user;
}
