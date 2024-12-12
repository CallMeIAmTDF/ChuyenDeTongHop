package com.huce.edu_v2.service.impl;

import com.huce.edu_v2.advice.exception.DuplicateRecordException;
import com.huce.edu_v2.advice.exception.ResourceNotFoundException;
import com.huce.edu_v2.dto.mapper.TopicMapper;
import com.huce.edu_v2.dto.request.topic.TopicCreateRequest;
import com.huce.edu_v2.dto.request.topic.TopicEditRequest;
import com.huce.edu_v2.dto.response.pageable.Meta;
import com.huce.edu_v2.dto.response.pageable.ResultPaginationDTO;
import com.huce.edu_v2.dto.response.topic.AdminTopicResponse;
import com.huce.edu_v2.dto.response.topic.TopicResponse;
import com.huce.edu_v2.entity.Level;
import com.huce.edu_v2.entity.Topic;
import com.huce.edu_v2.repository.LevelRepository;
import com.huce.edu_v2.repository.TopicRepository;
import com.huce.edu_v2.service.TopicService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TopicServiceImpl implements TopicService {
	TopicRepository topicRepository;
	LevelRepository levelRepository;
    TopicMapper topicMapper;

	@Override
	public List<TopicResponse> findTopicsWithProgressAndWordCountByLevelId(Integer lid, String uid){
		return topicRepository.findTopicsWithProgressAndWordCountByLevelId(lid, uid).stream().map(TopicResponse::new).toList();
	}

	@Override
    public AdminTopicResponse findById(Integer id) {
        Topic topic = topicRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Topic", "id", id)
        );
        return topicMapper.toAdminTopicResponse(topic);
    }

    @Override
    public ResultPaginationDTO getTopics(Specification<Topic> spec, Pageable pageable, int levelId) {
        Page<Topic> page;
        List<AdminTopicResponse> topics = new ArrayList<>();

        if (levelId == 0) {
            page = this.topicRepository.findAll(spec, pageable);
            topics = page.stream()
                    .map(topicMapper::toAdminTopicResponse)
                    .toList();
        } else {
            Level level = levelRepository.findById(levelId).orElseThrow(
                    () -> new ResourceNotFoundException("Level", "id", levelId)
            );

            Specification<Topic> specification = (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("level"), level);
            page = this.topicRepository.findAll(spec.and(specification), pageable);
            topics = page.stream()
                    .filter(topic -> topic.getLevel().getLid() == levelId)
                    .map(topicMapper::toAdminTopicResponse)
                    .toList();
        }

        return ResultPaginationDTO.builder()
                .meta(Meta.builder()
                        .page(pageable.getPageNumber() + 1)
                        .pageSize(pageable.getPageSize())
                        .pages(page.getTotalPages())
                        .total(page.getTotalElements())
                        .build())
                .result(topics)
                .build();
	}

	@Override
    public AdminTopicResponse create(TopicCreateRequest request) {
        Level level = levelRepository.findById(request.getLevelId()).orElseThrow(
                () -> new ResourceNotFoundException("Level", "id", request.getLevelId())
        );

        if (topicRepository.existsByLevelAndTname(level, request.getName()))
            throw new DuplicateRecordException("Topic", "name", request.getName());

        Topic newTopic = topicRepository.save(Topic.builder()
                .tname(request.getName())
                .level(level)
				.build());

        return topicMapper.toAdminTopicResponse(newTopic);
	}

	@Override
    public AdminTopicResponse edit(TopicEditRequest request) {
        Level level = levelRepository.findById(request.getLevelId()).orElseThrow(
                () -> new ResourceNotFoundException("Level", "id", request.getLevelId())
        );

        Topic topic = topicRepository.findById(request.getId()).orElseThrow(
                () -> new ResourceNotFoundException("Topic", "id", request.getId())
        );

        if (!request.getName().equals(topic.getTname()) && topicRepository.existsByLevelAndTname(level, request.getName()))
            throw new DuplicateRecordException("Topic", "name", request.getName());

        topic.setTname(request.getName());
        topic.setLevel(level);

        return topicMapper.toAdminTopicResponse(topicRepository.save(topic));
	}

	@Override
    public AdminTopicResponse delete(Integer id) {
		Topic topic = topicRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Topic", "id", id)
		);

		topicRepository.delete(topic);

        return null;
	}
}
