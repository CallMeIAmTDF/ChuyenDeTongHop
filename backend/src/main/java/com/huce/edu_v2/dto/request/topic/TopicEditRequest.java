package com.huce.edu_v2.dto.request.topic;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TopicEditRequest {
	Integer id;
	String name;
	int levelId;
}
