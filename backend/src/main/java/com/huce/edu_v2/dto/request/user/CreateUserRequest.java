package com.huce.edu_v2.dto.request.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateUserRequest {
    @NotBlank(message = "Name cannot be blank")
    String name;

    @Email(message = "Invalid Email")
    @NotBlank(message = "Email cannot be blank")
    String email;

    @Size(min = 8, max = 20, message = "invalid password")
    String password;
//    @Past(message = "Date of birth must be before current date")
//    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
//    LocalDate dob;
//
//    @JsonProperty("mobile_number")
//    @Pattern(regexp = "^0\\d{9}$", message = "Invalid phone number")
//    String mobileNumber;
//
//    @Enumerated(EnumType.STRING)
//    GenderEnum gender;
//
//    String address;
}