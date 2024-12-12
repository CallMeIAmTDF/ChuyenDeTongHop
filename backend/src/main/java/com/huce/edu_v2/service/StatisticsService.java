package com.huce.edu_v2.service;

import com.huce.edu_v2.dto.response.pdf.PdfFileInfo;

import java.io.File;
import java.util.List;
import java.util.Map;

public interface StatisticsService {
	Map<String, Long> statisticsWeeklyCorrectAnswerRate();

	List<Object[]> statisticsWeeklyAnswerByLevel();

	void generatePVPRankingReport() throws Exception;

	List<PdfFileInfo> getPVPRankingReports();

	File downloadReports(String fileName);
}
