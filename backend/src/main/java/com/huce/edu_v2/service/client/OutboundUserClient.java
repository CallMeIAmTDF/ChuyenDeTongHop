package com.huce.edu_v2.service.client;


import com.huce.edu_v2.dto.request.auth.ExchangeTokenRequest;
import com.huce.edu_v2.dto.response.auth.ExchangeTokenResponse;
import com.huce.edu_v2.dto.response.auth.OutboundUserResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClientRequest;

import java.time.Duration;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OutboundUserClient {

    public ExchangeTokenResponse exchangeToken(ExchangeTokenRequest request) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("code", request.getCode());
        queryParams.add("client_id", request.getClientId());
        queryParams.add("client_secret", request.getClientSecret());
        queryParams.add("redirect_uri", request.getRedirectUri());
        queryParams.add("grant_type", request.getGrantType());

        WebClient webClient = WebClient.builder().baseUrl("https://oauth2.googleapis.com/token").build();
        return webClient.post()
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters.fromFormData(queryParams))
                .retrieve()
                .bodyToMono(ExchangeTokenResponse.class)
                .block();
    }

    public OutboundUserResponse getUserInfo(String alt, String accessToken) {
        WebClient webClient = WebClient.builder().baseUrl("https://www.googleapis.com/oauth2/v1").build();

        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/userinfo")
                        .queryParam("alt", alt)
                        .queryParam("access_token", accessToken)
                        .build())
                .httpRequest(httpRequest -> {
                    HttpClientRequest reactorRequest = httpRequest.getNativeRequest();
                    reactorRequest.responseTimeout(Duration.ofSeconds(2));
                })
                .retrieve()
                .bodyToMono(OutboundUserResponse.class)
                .block();
    }
}
