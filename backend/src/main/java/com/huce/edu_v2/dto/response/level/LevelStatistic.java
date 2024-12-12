package com.huce.edu_v2.dto.response.level;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LevelStatistic {
	String level_name;
	Long total_answers;
}
