package com.huce.edu_v2.controller;

import com.huce.edu_v2.advice.exception.IdInvalidException;
import com.huce.edu_v2.dto.ApiResponse;
import com.huce.edu_v2.dto.request.user.CreateUserRequest;
import com.huce.edu_v2.dto.request.auth.AuthenticationRequest;
import com.huce.edu_v2.dto.request.auth.VerifyNewPasswordRequest;
import com.huce.edu_v2.dto.response.user.UserResponse;
import com.huce.edu_v2.dto.response.auth.AuthenticationResponse;
import com.huce.edu_v2.service.AuthenticationService;
import com.huce.edu_v2.service.UserService;
import com.huce.edu_v2.service.VerifyCodeService;
import com.nimbusds.jose.JOSEException;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;
    UserService userService;
    VerifyCodeService verifyCodeService;
    Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    @PostMapping("/login")
    ResponseEntity<ApiResponse<AuthenticationResponse>> authenticate(@RequestBody AuthenticationRequest request) {
        AuthenticationResponse authenticationResponse = authenticationService.authenticate(request);

        logger.debug("fetchCustomerDetails method start");
        ApiResponse<AuthenticationResponse> apiResponse = ApiResponse.<AuthenticationResponse>builder()
                .code(HttpStatus.OK.value())
                .message("User login")
                .data(authenticationResponse)
                .build();
        logger.debug("fetchCustomerDetails method end");

        return ResponseEntity.ok()
                .body(apiResponse);
    }

    @PostMapping("/register")
    public ApiResponse<UserResponse> createNewUser(@Valid @RequestBody CreateUserRequest postManUser) {
        UserResponse userResponse = this.userService.handleCreateUser(postManUser);
        return ApiResponse.<UserResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Register a new user")
                .data(userResponse)
                .build();
    }

    @PostMapping("/outbound/authentication")
    ResponseEntity<ApiResponse<AuthenticationResponse>> outboundAuthenticate(
            @RequestParam("code") String code
    ) {
        AuthenticationResponse infoAuthenticationDTO = authenticationService.outboundAuthenticate(code);

        ApiResponse<AuthenticationResponse> apiResponse = ApiResponse.<AuthenticationResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Success")
                .data(infoAuthenticationDTO)
                .build();

        return ResponseEntity.ok()
                .body(apiResponse);
    }

    @PostMapping("/refreshToken")
    ApiResponse<AuthenticationResponse> refreshToken(@CookieValue(name = "refresh_token", defaultValue = "defaultToken") String refresh_token) throws IdInvalidException, ParseException, JOSEException {
        if (refresh_token.equals("defaultToken")) {
            throw new IdInvalidException("You do not have a refresh token in the cookie");
        }

        AuthenticationResponse authenticationResponse = authenticationService.refreshToken(refresh_token);

        return ApiResponse.<AuthenticationResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Refresh Token")
                .data(authenticationResponse)
                .build();
    }

    @PostMapping("/logout")
    ApiResponse<Void> logout(@CookieValue(name = "refresh_token", defaultValue = "defaultToken") String refresh_token) throws IdInvalidException, ParseException, JOSEException {
        if (refresh_token.equals("defaultToken")) {
            throw new IdInvalidException("You do not have a refresh token in the cookie");
        }

        authenticationService.logout(refresh_token);

        return ApiResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("User logout")
                .data(null)
                .build();
    }

    @GetMapping("/verifyRegister")
    ApiResponse<AuthenticationResponse> verifyRegister(@RequestParam(name = "code") String code) {
        AuthenticationResponse authenticationResponse = authenticationService.createAuthenticationResponse(verifyCodeService.verifyRegister(code));

        return ApiResponse.<AuthenticationResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Verify email register success")
                .data(authenticationResponse)
                .build();
    }

    @PostMapping("/verifyForgotPassword")
    ApiResponse<AuthenticationResponse> verifyForgotPassword(@RequestBody VerifyNewPasswordRequest request) {
        AuthenticationResponse authenticationResponse = authenticationService.createAuthenticationResponse(verifyCodeService.verifyForgotPassword(request));

        return ApiResponse.<AuthenticationResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Verify email forgot password success")
                .data(authenticationResponse)
                .build();
    }
}