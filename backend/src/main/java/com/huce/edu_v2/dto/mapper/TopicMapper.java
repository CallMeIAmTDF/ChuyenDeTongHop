package com.huce.edu_v2.dto.mapper;

import com.huce.edu_v2.dto.response.topic.AdminTopicResponse;
import com.huce.edu_v2.entity.Topic;
import com.huce.edu_v2.entity.Word;
import com.huce.edu_v2.repository.WordRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TopicMapper {
    WordRepository wordRepository;

    public AdminTopicResponse toAdminTopicResponse(Topic topic) {

        Specification<Word> specification = (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("topic"), topic);

        return AdminTopicResponse.builder()
                .id(topic.getTid())
                .name(topic.getTname())
                .numWords(wordRepository.count(specification))
                .levelId(topic.getLevel().getLid())
                .levelName(topic.getLevel().getLname())
                .build();
    }
}
