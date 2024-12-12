package com.huce.edu_v2.service;

import com.huce.edu_v2.dto.request.word.WordCreateRequest;
import com.huce.edu_v2.dto.request.word.WordEditRequest;
import com.huce.edu_v2.dto.response.pageable.ResultPaginationDTO;
import com.huce.edu_v2.dto.response.test.TestResponse;
import com.huce.edu_v2.dto.response.word.AdminWordResponse;
import com.huce.edu_v2.dto.response.word.QuestionResponse;
import com.huce.edu_v2.entity.TestHistory;
import com.huce.edu_v2.entity.User;
import com.huce.edu_v2.entity.Word;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Map;

public interface WordService {
	Word findFirstWordBeforeWid(Integer wid, Integer tid);

	QuestionResponse getQuestion(Integer wid, Integer tid);

	Boolean checkAnswer(Integer wid, String w, String uid);

	Word findFirstByWid(Integer wid);

	List<QuestionResponse> getTest(User user);
	
	Map<String, Object> handleCheckTest(List<TestResponse> testQuestion, String uid);

	List<TestHistory> getTestHistory(String uid);

	AdminWordResponse findById(Integer id);

	ResultPaginationDTO getWords(Specification<Word> spec, Pageable pageable, Integer topicId);

	AdminWordResponse create(WordCreateRequest request);

	AdminWordResponse edit(WordEditRequest request);

	AdminWordResponse delete(Integer id);
}
