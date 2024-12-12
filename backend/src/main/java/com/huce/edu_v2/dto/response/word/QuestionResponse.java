package com.huce.edu_v2.dto.response.word;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionResponse {
	Integer wid;
	String question;
	List<String> answers;
}
