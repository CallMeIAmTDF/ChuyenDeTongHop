package com.huce.edu_v2.dto.mapper;

import com.huce.edu_v2.dto.response.level.AdminLevelResponse;
import com.huce.edu_v2.entity.Level;
import com.huce.edu_v2.entity.Topic;
import com.huce.edu_v2.repository.TopicRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LevelMapper {
    TopicRepository topicRepository;

    public AdminLevelResponse toAdminLevelResponse(Level level) {

        Specification<Topic> specification = (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("level"), level);


        return AdminLevelResponse.builder()
                .id(level.getLid())
                .name(level.getLname())
                .image(level.getLimage())
                .numTopics(topicRepository.count(specification))
                .numWords(0)
                .build();
    }
}
