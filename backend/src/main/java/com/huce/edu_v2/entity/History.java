package com.huce.edu_v2.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "history")
public class History {
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	@Column(name = "hid")
	Integer id;

	@Column(name = "uid")
	String uid;

	@ManyToOne
	@JoinColumn(name = "wid")
	Word word;

	@Column(name = "iscorrect")
	Integer iscorrect;

	@Column(name = "datetime")
	LocalDateTime datetime;

	@PrePersist
	protected void onCreate() {
		this.datetime = LocalDateTime.now();
	}
}
