package com.huce.edu_v2.dto.response.test;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class TestResponse {
	Integer wid;
	String question;
	String userAnswer;
	String systemAnswer;
	boolean isCorrect;
}
