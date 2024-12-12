package com.huce.edu_v2.dto.response.chat;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.huce.edu_v2.util.constant.ChatStatusEnum;
import com.huce.edu_v2.util.constant.SenderType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class UserResponse {
    String userId;

    String userName;

    String image;

    String adminId;

    String adminName;

    @Enumerated(EnumType.STRING)
    SenderType senderType;

    String message;

    LocalDateTime timestamp;

    @Enumerated(EnumType.STRING)
    ChatStatusEnum status;
}
