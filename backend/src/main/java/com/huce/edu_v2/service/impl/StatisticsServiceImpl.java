package com.huce.edu_v2.service.impl;

import com.huce.edu_v2.dto.response.game.UserResponse;
import com.huce.edu_v2.dto.response.pdf.PdfFileInfo;
import com.huce.edu_v2.entity.History;
import com.huce.edu_v2.repository.HistoryRepository;
import com.huce.edu_v2.service.StatisticsService;
import com.huce.edu_v2.service.UserPointsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {
	final HistoryRepository historyRepository;
	final UserPointsService userPointsService;
	final TemplateEngine templateEngine;
	static final String PDF_DIRECTORY = "src/main/resources/assets/pdf_report/";

	@Override
	public Map<String, Long> statisticsWeeklyCorrectAnswerRate() {
		Map<String, Long> result = new HashMap<>();
		result.put("correct", 0L);
		result.put("incorrect", 0L);
		Map<String, String> weekDay = getWeekDay();
		historyRepository.getWeekHistory(weekDay.get("start"), weekDay.get("end")).stream()
				.collect(Collectors.groupingBy(History::getIscorrect, Collectors.counting()))
				.forEach((key, value) -> result.put(key == 0 ? "incorrect" : "correct", value));
		return result;
	}

	@Override
	public List<Object[]> statisticsWeeklyAnswerByLevel() {
		Map<String, String> weekDay = getWeekDay();
		return historyRepository.statisticsLevel(weekDay.get("start"), weekDay.get("end"));
	}

	@Override
	@Scheduled(cron = "0 0 4 ? * MON") //4h sáng thứ 2
	public void generatePVPRankingReport() throws Exception {
		List<UserResponse> users = userPointsService.getTopUsers(10);
		LocalDate currentDate = LocalDate.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		String formattedDate = currentDate.format(formatter);
		Map<String, Object> variables = new HashMap<>();
		variables.put("exportDate", formattedDate);
		variables.put("userList", users);
		String htmlContent = renderHtml("pdf_report", variables);
		String outputFilePath = PDF_DIRECTORY + "pvp_rank_report_" + formattedDate.replace("/", "-") + ".pdf";
		generatePdf(htmlContent, outputFilePath);
		System.out.println("PDF generated successfully: " + outputFilePath);
		userPointsService.delete("points"); //xóa bảng
	}

	@Override
	public List<PdfFileInfo> getPVPRankingReports() {
		List<PdfFileInfo> pdfFiles = new ArrayList<>();
		try {
			Path path = Path.of(PDF_DIRECTORY);
			Files.walk(path)
					.filter(Files::isRegularFile)
					.filter(p -> p.toString().endsWith(".pdf"))
					.forEach(p -> {
						try {
							long fileSize = Files.size(p);
							String fileName = p.getFileName().toString();
							String lastModified = fileName.replace("pvp_rank_report_", "").replace(".pdf", "");
							pdfFiles.add(new PdfFileInfo(
									fileName, fileSize, lastModified));
						} catch (IOException e) {
							e.printStackTrace();
						}
					});
		} catch (IOException e) {
			e.printStackTrace();
		}
		return pdfFiles;
	}

	@Override
	public File downloadReports(String fileName) {
		Path filePath = Paths.get(PDF_DIRECTORY, fileName);
		File file = filePath.toFile();
		if (!file.exists()) return null;
		return file;
	}

	public String renderHtml(String templateName, Map<String, Object> variables) {
		Context context = new Context();
		context.setVariables(variables);
		return templateEngine.process(templateName, context);
	}

	public void generatePdf(String htmlContent, String outputFilePath) throws Exception {
		File parentFolder = new File(PDF_DIRECTORY);
		if (!parentFolder.exists()) {
			parentFolder.mkdirs();
		}
		OutputStream outputStream = new FileOutputStream(outputFilePath);
		ITextRenderer renderer = new ITextRenderer();
		renderer.setDocumentFromString(htmlContent);
		renderer.layout();
		renderer.createPDF(outputStream);
		outputStream.close();
	}

	public Map<String, String> getWeekDay(){
		LocalDate today = LocalDate.now();
		LocalDate start = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
		LocalDate end = today.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));
		Map<String, String> res = new HashMap<>();
		res.put("start", start.toString());
		res.put("end", end.toString());
		return res;
	}
}
