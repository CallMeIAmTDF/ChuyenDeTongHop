package com.huce.edu_v2.service.impl;

import com.huce.edu_v2.advice.AppException;
import com.huce.edu_v2.advice.ErrorCode;
import com.huce.edu_v2.advice.exception.ResourceNotFoundException;
import com.huce.edu_v2.dto.request.auth.AuthenticationRequest;
import com.huce.edu_v2.dto.request.auth.ExchangeTokenRequest;
import com.huce.edu_v2.dto.request.auth.InvalidatedTokenRequest;
import com.huce.edu_v2.dto.response.auth.AuthenticationResponse;
import com.huce.edu_v2.entity.Role;
import com.huce.edu_v2.entity.User;
import com.huce.edu_v2.repository.RoleRepository;
import com.huce.edu_v2.repository.UserRepository;
import com.huce.edu_v2.service.AuthenticationService;
import com.huce.edu_v2.service.InvalidatedTokenService;
import com.huce.edu_v2.service.client.OutboundUserClient;
import com.huce.edu_v2.util.SecurityUtil;
import com.nimbusds.jose.JOSEException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.text.ParseException;
import java.util.Date;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationServiceImpl implements AuthenticationService {
    AuthenticationManagerBuilder authenticationManagerBuilder;
    UserRepository userRepository;
    InvalidatedTokenService invalidatedTokenService;
    SecurityUtil securityUtil;
    OutboundUserClient outboundUserClient;
    RoleRepository roleRepository;

    @NonFinal
    protected final String GRANT_TYPE = "authorization_code";

    @NonFinal
    @Value("${auth.outbound.identity.client-id}")
    protected String CLIENT_ID;

    @NonFinal
    @Value("${auth.outbound.identity.client-secret}")
    protected String CLIENT_SECRET;

    @NonFinal
    @Value("${auth.outbound.identity.redirect-uri}")
    protected String REDIRECT_URI;

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                request.getEmail(), request.getPassword());
        // authentication user => override loadUserByUsername
        Authentication authentication = authenticationManagerBuilder.getObject()
                .authenticate(authenticationToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        var user = userRepository
                .findFirstByEmailAndActive(request.getEmail(), true)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return createAuthenticationResponse(user);
    }

    @Override
    public void logout(String refreshToken) throws ParseException, JOSEException {
        var signToken = securityUtil.verifyToken(refreshToken, true);

        String jit = signToken.getJWTClaimsSet().getJWTID();
        Date expiryTime = signToken.getJWTClaimsSet().getExpirationTime();

        InvalidatedTokenRequest invalidatedTokenRequest =
                InvalidatedTokenRequest.builder().id(jit).expiryTime(expiryTime.toInstant()).build();

        invalidatedTokenService.createInvalidatedToken(invalidatedTokenRequest);
    }

    @Override
    public AuthenticationResponse refreshToken(String refreshToken) throws ParseException, JOSEException {
        var signedJWT = securityUtil.verifyToken(refreshToken, true);

        var jit = signedJWT.getJWTClaimsSet().getJWTID();
        var expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        InvalidatedTokenRequest invalidatedTokenRequest =
                InvalidatedTokenRequest.builder().id(jit).expiryTime(expiryTime.toInstant()).build();

        invalidatedTokenService.createInvalidatedToken(invalidatedTokenRequest);

        var username = signedJWT.getJWTClaimsSet().getSubject();
        var user = userRepository.findByEmail(username)
                .orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));

        return createAuthenticationResponse(user);
    }

    @Override
    public AuthenticationResponse createAuthenticationResponse(User user) {
        var accessToken = securityUtil.generateToken(user, false);
        var refreshToken = securityUtil.generateToken(user, true);

        AuthenticationResponse.UserLogin userLogin = AuthenticationResponse.UserLogin.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .role("ROLE_" + user.getRole().getName())
                .noPassword(!StringUtils.hasText(user.getPassword()))
                .image(user.getImage())
                .build();

        return AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .user(userLogin)
                .build();
    }

    @Override
    public AuthenticationResponse outboundAuthenticate(String code) {
        var response = outboundUserClient.exchangeToken(ExchangeTokenRequest.builder()
                .code(code)
                .clientId(CLIENT_ID)
                .clientSecret(CLIENT_SECRET)
                .redirectUri(REDIRECT_URI)
                .grantType(GRANT_TYPE)
                .build());

        log.info("TOKEN RESPONSE {}", response);

        var userInfo = outboundUserClient.getUserInfo("json", response.getAccessToken());

        log.info("User Info {}", userInfo);

        Role role = roleRepository.findByName("USER").orElseThrow(
                () -> new ResourceNotFoundException("Role", "roleName", "USER")
        );

        var user = userRepository.findByEmail(userInfo.getEmail()).orElseGet(
                () -> userRepository.save(User.builder()
                        .name(userInfo.getName())
                        .email(userInfo.getEmail())
                        .password("")
                        .active(true)
                        .role(role)
                        .build()));

        return createAuthenticationResponse(user);
    }
}
