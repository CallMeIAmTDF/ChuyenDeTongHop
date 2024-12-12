package com.huce.edu_v2.dto.response.auth;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InfoAuthenticationDTO {
    String refreshToken;
    AuthenticationResponse authenticationResponse;
}