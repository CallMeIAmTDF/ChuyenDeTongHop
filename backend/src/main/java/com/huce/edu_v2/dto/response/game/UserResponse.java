package com.huce.edu_v2.dto.response.game;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@RequiredArgsConstructor
public class UserResponse {
	String name;
	String image;
	Integer point;
}
