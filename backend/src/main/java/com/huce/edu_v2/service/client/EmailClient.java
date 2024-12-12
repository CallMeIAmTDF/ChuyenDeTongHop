package com.huce.edu_v2.service.client;


import com.huce.edu_v2.dto.request.email.EmailRequest;
import com.huce.edu_v2.dto.response.email.EmailResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmailClient {
    public EmailResponse sendEmail(String apiKey, EmailRequest emailRequest) {
        String initBody = String.format("""
                        {
                           "sender":{
                              "name":"%s",
                              "email":"%s"
                           },
                        }"""
                , emailRequest.getSender().getName(), emailRequest.getSender().getEmail());

        JSONObject body = new JSONObject(initBody);
        body.put("to", emailRequest.getTo());
        body.put("subject", emailRequest.getSubject());
        body.put("htmlContent", emailRequest.getHtmlContent());
//        System.out.println(ne);

        WebClient webClient = WebClient.builder().baseUrl("https://api.brevo.com/v3/smtp/email").build();
        return webClient.post()
                .contentType(MediaType.APPLICATION_JSON)
                .header("api-key", apiKey)
                .body(BodyInserters.fromValue(body.toString()))
                .retrieve()
                .bodyToMono(EmailResponse.class)
                .block();
    }
}
