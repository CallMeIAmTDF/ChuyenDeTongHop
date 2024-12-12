package com.huce.edu_v2.service;

import com.huce.edu_v2.dto.request.level.LevelCreateRequest;
import com.huce.edu_v2.dto.request.level.LevelEditRequest;
import com.huce.edu_v2.dto.response.level.AdminLevelResponse;
import com.huce.edu_v2.dto.response.pageable.ResultPaginationDTO;
import com.huce.edu_v2.dto.response.level.LevelResponse;
import com.huce.edu_v2.entity.Level;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface LevelService {
	AdminLevelResponse findById(Integer id);
	
	List<LevelResponse> findAllLevelsWithProgressForUser(String uid);

	ResultPaginationDTO getLevels(Specification<Level> spec, Pageable pageable);

	AdminLevelResponse create(LevelCreateRequest request);

	AdminLevelResponse edit(LevelEditRequest request);

	AdminLevelResponse delete(Integer id);
}
