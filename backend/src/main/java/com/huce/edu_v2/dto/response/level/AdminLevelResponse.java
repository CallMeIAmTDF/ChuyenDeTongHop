package com.huce.edu_v2.dto.response.level;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AdminLevelResponse {
	int id;
	String name;
	String image;
	long numTopics;
	long numWords;
}
