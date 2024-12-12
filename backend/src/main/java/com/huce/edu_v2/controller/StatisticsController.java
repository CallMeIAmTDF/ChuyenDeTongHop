package com.huce.edu_v2.controller;

import com.huce.edu_v2.dto.ApiResponse;
import com.huce.edu_v2.dto.response.game.UserResponse;
import com.huce.edu_v2.dto.response.level.LevelStatistic;
import com.huce.edu_v2.dto.response.pdf.PdfFileInfo;
import com.huce.edu_v2.service.StatisticsService;
import com.huce.edu_v2.service.UserPointsService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/statistics")
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StatisticsController {
	final StatisticsService statisticsService;
	final UserPointsService userPointsService;

	@GetMapping("/weeklyAnswerRate")
	public ApiResponse<Map<String, Long>> getWeeklyAnswerRate() {
		return ApiResponse.<Map<String, Long>>builder()
				.message("Get Weekly Answer Rate")
				.code(HttpStatus.OK.value())
				.data(statisticsService.statisticsWeeklyCorrectAnswerRate())
				.build();
	}

	@GetMapping("/weeklyPVPLeaderboard")
	public ApiResponse<List<UserResponse>> getWeeklyPVPLeaderboard() {
		return ApiResponse.<List<UserResponse>>builder()
				.message("Get Weekly PVP Leaderboard")
				.code(HttpStatus.OK.value())
				.data(userPointsService.getTopUsers(10))
				.build();
	}

	@GetMapping("/weeklyAnswerByLevel")
	public ApiResponse<List<LevelStatistic>> getWeeklyAnswerByLevel() {
		return ApiResponse.<List<LevelStatistic>>builder()
				.message("Get weekly response statistics by level")
				.code(HttpStatus.OK.value())
				.data(statisticsService
						.statisticsWeeklyAnswerByLevel()
						.stream()
						.map(r ->
								new LevelStatistic((String) r[0], (Long) r[1]))
						.collect(Collectors.toList())
				)
				.build();
	}

	@GetMapping("/pvpRankingReport")
	public ApiResponse<List<PdfFileInfo>> pvpRankingReport() {
		return ApiResponse.<List<PdfFileInfo>>builder()
				.message("Get PVP Ranking Reports")
				.code(HttpStatus.OK.value())
				.data(statisticsService.getPVPRankingReports())
				.build();
	}

	@GetMapping("/downloadReport/{fileName}")
	public ResponseEntity<FileSystemResource> downloadReport(@PathVariable String fileName) {
		File file = statisticsService.downloadReports(fileName);
		if(file == null) return ResponseEntity.notFound().build();
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Disposition", "attachment; filename=" + file.getName());
		return ResponseEntity.ok().headers(headers).body(new FileSystemResource(file));
	}
}
