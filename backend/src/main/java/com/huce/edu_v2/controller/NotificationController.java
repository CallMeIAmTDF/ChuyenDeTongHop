package com.huce.edu_v2.controller;


import com.huce.edu_v2.dto.request.email.NotificationEvent;
import com.huce.edu_v2.service.EmailService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NotificationController {
    EmailService emailService;

    @KafkaListener(topics = "register")
    public void listenNotificationDelivery(NotificationEvent message) {
        log.info("Message received: {}", message);
        emailService.sendEmailRegister(message);
    }

    @KafkaListener(topics = "forgot-password")
    public void listenNotificationForgotPassword(NotificationEvent message) {
        log.info("Message received: {}", message);
        emailService.sendEmailForgotPassword(message);
    }
}
