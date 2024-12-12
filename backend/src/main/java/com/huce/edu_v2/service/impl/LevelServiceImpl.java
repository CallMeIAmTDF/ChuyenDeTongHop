package com.huce.edu_v2.service.impl;

import com.huce.edu_v2.advice.exception.DuplicateRecordException;
import com.huce.edu_v2.advice.exception.ResourceNotFoundException;
import com.huce.edu_v2.dto.mapper.LevelMapper;
import com.huce.edu_v2.dto.request.level.LevelCreateRequest;
import com.huce.edu_v2.dto.request.level.LevelEditRequest;
import com.huce.edu_v2.dto.response.level.AdminLevelResponse;
import com.huce.edu_v2.dto.response.level.LevelResponse;
import com.huce.edu_v2.dto.response.pageable.Meta;
import com.huce.edu_v2.dto.response.pageable.ResultPaginationDTO;
import com.huce.edu_v2.entity.Level;
import com.huce.edu_v2.repository.LevelRepository;
import com.huce.edu_v2.service.LevelService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LevelServiceImpl implements LevelService {
	LevelRepository levelRepository;
	LevelMapper levelMapper;

	@Override
	public AdminLevelResponse findById(Integer id) {
		Level level = levelRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Level", "id", id)
		);
		return levelMapper.toAdminLevelResponse(level);
	}

	@Override
	public List<LevelResponse> findAllLevelsWithProgressForUser(String uid){
		return levelRepository.findAllLevelsWithProgressForUser(uid).stream().map(LevelResponse::new).toList();
	}

	@Override
	public ResultPaginationDTO getLevels(Specification<Level> spec, Pageable pageable) {
		Page<Level> page = this.levelRepository.findAll(spec, pageable);

		List<AdminLevelResponse> levels = page.stream().map(
                levelMapper::toAdminLevelResponse
		).toList();

		return ResultPaginationDTO.builder()
				.meta(Meta.builder()
						.page(pageable.getPageNumber() + 1)
						.pageSize(pageable.getPageSize())
						.pages(page.getTotalPages())
						.total(page.getTotalElements())
						.build())
				.result(levels)
				.build();
	}

	@Override
	public AdminLevelResponse create(LevelCreateRequest request) {
		if (levelRepository.existsByLname(request.getName()))
			throw new DuplicateRecordException("Level", "name", request.getName());

		Level newLevel = levelRepository.save(Level.builder()
				.lname(request.getName())
				.limage(request.getImage())
				.build());

		return levelMapper.toAdminLevelResponse(newLevel);
	}

	@Transactional
	@Override
	public AdminLevelResponse edit(LevelEditRequest request) {
		Level level = levelRepository.findById(request.getId()).orElseThrow(
				() -> new ResourceNotFoundException("Level", "id", request.getId())
		);

		if (!request.getName().equals(level.getLname()) && levelRepository.existsByLname(request.getName()))
			throw new DuplicateRecordException("Level", "name", request.getName());

		level.setLname(request.getName());
		level.setLimage(request.getImage());

		return levelMapper.toAdminLevelResponse(levelRepository.save(level));
	}

	@Override
	public AdminLevelResponse delete(Integer id) {
		Level level = levelRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Level", "id", id)
		);

		levelRepository.delete(level);

		return null;
	}
}
