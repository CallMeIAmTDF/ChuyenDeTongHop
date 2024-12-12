package com.huce.edu_v2.controller;

import com.huce.edu_v2.dto.ApiResponse;
import com.huce.edu_v2.dto.request.topic.TopicCreateRequest;
import com.huce.edu_v2.dto.request.topic.TopicEditRequest;
import com.huce.edu_v2.dto.response.pageable.ResultPaginationDTO;
import com.huce.edu_v2.dto.response.topic.AdminTopicResponse;
import com.huce.edu_v2.dto.response.topic.TopicResponse;
import com.huce.edu_v2.entity.Topic;
import com.huce.edu_v2.entity.User;
import com.huce.edu_v2.service.TopicService;
import com.huce.edu_v2.service.UserService;
import com.huce.edu_v2.util.SecurityUtil;
import com.turkraft.springfilter.boot.Filter;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/topics")
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PUBLIC, makeFinal = true)
public class TopicController {
	TopicService topicService;
	UserService userService;
	SecurityUtil securityUtil;

	@GetMapping("/getByLevel")
	public ApiResponse<List<TopicResponse>> getByLevel(@RequestParam Integer lid){
		User user = userService.fetchUserByEmail(securityUtil.getCurrentUserLogin().orElse(null));

		return ApiResponse.<List<TopicResponse>>builder()
				.message("Fetch all topics by levelId and user")
				.code(HttpStatus.OK.value())
				.data(topicService.findTopicsWithProgressAndWordCountByLevelId(lid, user.getId()))
				.build();
	}

	@GetMapping("/{id}")
	public ApiResponse<AdminTopicResponse> getTopicById(@PathVariable Integer id) {
		return ApiResponse.<AdminTopicResponse>builder()
				.code(HttpStatus.OK.value())
				.message("Fetch level by id")
				.data(topicService.findById(id))
				.build();
	}

	@GetMapping("")
	public ApiResponse<ResultPaginationDTO> getLevels(
			@Filter Specification<Topic> spec,
			Pageable pageable,
			@RequestParam(name = "levelId", required = false, defaultValue = "0") Integer levelId) {

		return ApiResponse.<ResultPaginationDTO>builder()
				.code(HttpStatus.OK.value())
				.message("Fetch levels")
				.data(topicService.getTopics(spec, pageable, levelId))
				.build();
	}

	@PostMapping("")
	public ApiResponse<AdminTopicResponse> add(@RequestBody TopicCreateRequest request) {

		return ApiResponse.<AdminTopicResponse>builder()
				.code(HttpStatus.OK.value())
				.message("Create levels")
				.data(topicService.create(request))
				.build();
	}

	@PutMapping("")
	public ApiResponse<AdminTopicResponse> edit(@RequestBody TopicEditRequest request) {
		return ApiResponse.<AdminTopicResponse>builder()
				.code(HttpStatus.OK.value())
				.message("Update levels")
				.data(topicService.edit(request))
				.build();
	}

	@DeleteMapping("/{id}")
	public ApiResponse<AdminTopicResponse> delete(@PathVariable Integer id) {
		return ApiResponse.<AdminTopicResponse>builder()
				.code(HttpStatus.OK.value())
				.message("Delete levels")
				.data(topicService.delete(id))
				.build();
	}
}
