package com.huce.edu_v2.controller;

import com.huce.edu_v2.dto.ApiResponse;
import com.huce.edu_v2.dto.request.level.LevelCreateRequest;
import com.huce.edu_v2.dto.request.level.LevelEditRequest;
import com.huce.edu_v2.dto.response.level.AdminLevelResponse;
import com.huce.edu_v2.dto.response.level.LevelResponse;
import com.huce.edu_v2.dto.response.pageable.ResultPaginationDTO;
import com.huce.edu_v2.entity.Level;
import com.huce.edu_v2.entity.User;
import com.huce.edu_v2.service.LevelService;
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
@RequestMapping("/levels")
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PUBLIC, makeFinal = true)
public class LevelController {
	LevelService levelService;
	UserService userService;
	SecurityUtil securityUtil;

	@GetMapping("/getAll")
	public ApiResponse<List<LevelResponse>> getAll(){
		User user = userService.fetchUserByEmail(securityUtil.getCurrentUserLogin().orElse(null));

		return ApiResponse.<List<LevelResponse>>builder()
				.code(HttpStatus.OK.value())
				.message("Fetch all levels by user")
				.data(levelService.findAllLevelsWithProgressForUser(user.getId()))
				.build();
	}

	@GetMapping("/{id}")
	public ApiResponse<AdminLevelResponse> getById(@PathVariable Integer id) {
		return ApiResponse.<AdminLevelResponse>builder()
				.code(HttpStatus.OK.value())
				.message("Fetch level by id")
				.data(levelService.findById(id))
				.build();
	}

	@GetMapping("")
	public ApiResponse<ResultPaginationDTO> getLevels(
			@Filter Specification<Level> spec, Pageable pageable) {

		return ApiResponse.<ResultPaginationDTO>builder()
				.code(HttpStatus.OK.value())
				.message("Fetch levels")
				.data(levelService.getLevels(spec, pageable))
				.build();
	}

	@PostMapping("")
	public ApiResponse<AdminLevelResponse> add(@RequestBody LevelCreateRequest request) {

		return ApiResponse.<AdminLevelResponse>builder()
				.code(HttpStatus.OK.value())
				.message("Create levels")
				.data(levelService.create(request))
				.build();
	}

	@PutMapping("")
	public ApiResponse<AdminLevelResponse> edit(@RequestBody LevelEditRequest request) {
		return ApiResponse.<AdminLevelResponse>builder()
				.code(HttpStatus.OK.value())
				.message("Update levels")
				.data(levelService.edit(request))
				.build();
	}

	@DeleteMapping("/{id}")
	public ApiResponse<AdminLevelResponse> delete(@PathVariable Integer id) {
		return ApiResponse.<AdminLevelResponse>builder()
				.code(HttpStatus.OK.value())
				.message("Delete levels")
				.data(levelService.delete(id))
				.build();
	}
}
