package com.huce.edu_v2.dto.response.topic;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AdminTopicResponse {
	int id;
	String name;
	int levelId;
	String levelName;
	long numWords;
}
