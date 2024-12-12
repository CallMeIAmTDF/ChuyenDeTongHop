package com.huce.edu_v2.service;

import com.huce.edu_v2.dto.request.email.NotificationEvent;
import com.huce.edu_v2.dto.response.email.EmailResponse;

public interface EmailService {

    /**
     * @param message - Object NotificationEvent
     * @return messageId returned from Brevo
     */
    EmailResponse sendEmailRegister(NotificationEvent message);

    /**
     * @param message - Object NotificationEvent
     * @return messageId returned from Brevo
     */
    EmailResponse sendEmailForgotPassword(NotificationEvent message);
}
