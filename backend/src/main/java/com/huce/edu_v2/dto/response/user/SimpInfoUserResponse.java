package com.huce.edu_v2.dto.response.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.huce.edu_v2.util.constant.GenderEnum;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SimpInfoUserResponse {
    String id;
    String email;
    String name;
    GenderEnum gender;
    String address;
    LocalDate dob;
    @JsonProperty("mobile_number")
    String mobileNumber;
}