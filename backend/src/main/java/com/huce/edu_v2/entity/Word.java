package com.huce.edu_v2.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "words")
public class Word {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer wid;
	String word;
	String pronun;
	String entype;
	String vietype;
	String voice;
	String photo;
	String meaning;
	String endesc;
	String viedesc;
	@ManyToOne
	@JoinColumn(name = "tid")
	Topic topic;
}
