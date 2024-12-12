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
@Table(name = "levels")
public class Level {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer lid;

	String lname;

	String limage;
}

