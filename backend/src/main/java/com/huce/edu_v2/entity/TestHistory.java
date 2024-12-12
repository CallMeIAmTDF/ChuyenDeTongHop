package com.huce.edu_v2.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "test_history")
public class TestHistory {
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	@Column(name = "thid")
	private Integer thid;
	@Basic
	@Column(name = "uid")
	private String uid;
	@Basic
	@Column(name = "numques")
	private Integer numques;
	@Basic
	@Column(name = "numcorrectques")
	private Integer numcorrectques;
	@Basic
	@Column(name = "thdate")
	private LocalDateTime tdate;

	@PrePersist
	protected void onCreate() {
		this.tdate = LocalDateTime.now();
	}
}
