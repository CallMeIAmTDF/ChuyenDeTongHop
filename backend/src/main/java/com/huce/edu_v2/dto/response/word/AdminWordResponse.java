package com.huce.edu_v2.dto.response.word;


import com.huce.edu_v2.entity.Topic;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AdminWordResponse {
	Integer id;
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
	String topicName;
	Integer levelId;
}
