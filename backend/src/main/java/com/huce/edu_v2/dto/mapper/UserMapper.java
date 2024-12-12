package com.huce.edu_v2.dto.mapper;

import com.huce.edu_v2.dto.response.user.SimpInfoUserResponse;
import com.huce.edu_v2.dto.response.user.UserResponse;
import com.huce.edu_v2.entity.User;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserMapper {

    public UserResponse toUserResponse(User user) {

        var roleUser = UserResponse.RoleUser.builder()
                .id(user.getRole().getId())
                .name(user.getRole().getName())
                .build();

        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .dob(user.getDob())
                .gender(user.getGender())
                .address(user.getAddress())
                .email(user.getEmail())
                .role(roleUser)
                .image(user.getImage())
                .noPassword(!StringUtils.hasText(user.getPassword()))
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    public SimpInfoUserResponse toSimpInfoUserResponse(User user) {
        return SimpInfoUserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .dob(user.getDob())
                .gender(user.getGender())
                .address(user.getAddress())
                .email(user.getEmail())
                .mobileNumber(user.getMobileNumber())
                .build();
    }
}
