package com.huce.edu_v2.dto.mapper;

import com.huce.edu_v2.dto.response.word.AdminWordResponse;
import com.huce.edu_v2.entity.Word;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WordMapper {

    public AdminWordResponse toAdminWordResponse(Word word) {
        return AdminWordResponse.builder()
                .id(word.getWid())
                .word(word.getWord())
                .pronun(word.getPronun())
                .entype(word.getEntype())
                .vietype(word.getVietype())
                .viedesc(word.getViedesc())
                .voice(word.getVoice())
                .photo(word.getPhoto())
                .meaning(word.getMeaning())
                .endesc(word.getEndesc())
                .viedesc(word.getViedesc())
                .topicId(word.getTopic().getTid())
                .topicName(word.getTopic().getTname())
                .levelId(word.getTopic().getLevel().getLid())
                .build();
    }
}
