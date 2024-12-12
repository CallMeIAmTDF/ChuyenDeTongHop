package com.huce.edu_v2.dto.request.word;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WordCreateRequest {
	String word;
	String pronun;
	String entype;
	String vietype;
	String voice;
	String photo;
	String meaning;
	String endesc;
	String viedesc;
	Integer topicId;
}
