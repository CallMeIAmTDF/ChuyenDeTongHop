package com.huce.edu_v2.dto.request.level;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LevelEditRequest {
	Integer id;
	String name;
	String image;
}