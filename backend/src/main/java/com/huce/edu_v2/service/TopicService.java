package com.huce.edu_v2.service;

import com.huce.edu_v2.dto.request.level.LevelCreateRequest;
import com.huce.edu_v2.dto.request.level.LevelEditRequest;
import com.huce.edu_v2.dto.request.topic.TopicCreateRequest;
import com.huce.edu_v2.dto.request.topic.TopicEditRequest;
import com.huce.edu_v2.dto.response.level.AdminLevelResponse;
import com.huce.edu_v2.dto.response.level.LevelResponse;
import com.huce.edu_v2.dto.response.pageable.ResultPaginationDTO;
import com.huce.edu_v2.dto.response.topic.AdminTopicResponse;
import com.huce.edu_v2.dto.response.topic.TopicResponse;
import com.huce.edu_v2.entity.Level;
import com.huce.edu_v2.entity.Topic;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

public interface TopicService {
	List<TopicResponse> findTopicsWithProgressAndWordCountByLevelId(Integer lid, String uid);

	AdminTopicResponse findById(Integer id);

	ResultPaginationDTO getTopics(Specification<Topic> spec, Pageable pageable, int levelId);

	AdminTopicResponse create(TopicCreateRequest request);

	AdminTopicResponse edit(TopicEditRequest request);

	AdminTopicResponse delete(Integer id);
}
