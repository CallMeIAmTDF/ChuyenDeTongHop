package com.huce.edu_v2.service.impl;

import com.huce.edu_v2.advice.AppException;
import com.huce.edu_v2.advice.ErrorCode;
import com.huce.edu_v2.dto.request.email.NotificationEvent;
import com.huce.edu_v2.dto.request.email.EmailRequest;
import com.huce.edu_v2.dto.request.email.Recipient;
import com.huce.edu_v2.dto.request.email.Sender;
import com.huce.edu_v2.dto.response.email.EmailResponse;
import com.huce.edu_v2.service.EmailService;
import com.huce.edu_v2.service.client.EmailClient;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmailServiceImpl implements EmailService {
    EmailClient emailClient;
    SpringTemplateEngine templateEngine;

    @Value("${brevo.api-key}")
    @NonFinal
    String apiKey;

    @Value("${api.verify-register}")
    @NonFinal
    String urlVerifyRegister;

    @Value("${api.verify-forgot-password}")
    @NonFinal
    String urlVerifyForgotPassword;

    public EmailResponse sendEmailRegister(NotificationEvent message) {
        String html = templateEngine.process("verify_register", getContext(message, urlVerifyRegister));

        return send(message, html);
    }

    public EmailResponse sendEmailForgotPassword(NotificationEvent message) {
        String html = templateEngine.process("verify_forgot_password",  getContext(message, urlVerifyForgotPassword));

        return send(message, html);
    }

    private Context getContext(NotificationEvent message, String urlVerifyForgotPassword) {
        Map<String, Object> props = new HashMap<>();
        String url = urlVerifyForgotPassword + message.getParam().get("code");

        props.put("name", message.getParam().get("name"));
        props.put("url", url);

        Context context = new Context();
        context.setVariables(props);
        return context;
    }

    private EmailResponse send(NotificationEvent message, String html){
        EmailRequest emailRequest = EmailRequest.builder()
                .sender(Sender.builder()
                        .name("Hoàng Tuấn Anh")
                        .email("hoangtuananh1772003@gmail.com")
                        .build())
                .to(List.of(Recipient.builder()
                        .email(message.getRecipient())
                        .build()))
                .subject(message.getSubject())
                .htmlContent(html)
                .build();
        try {
            return emailClient.sendEmail(apiKey, emailRequest);
        } catch (Exception e) {
            throw new AppException(ErrorCode.CANNOT_SEND_EMAIL);
        }
    }
}
