package com.huce.edu_v2.service;

import com.huce.edu_v2.dto.request.auth.VerifyNewPasswordRequest;
import com.huce.edu_v2.entity.User;
import com.huce.edu_v2.entity.VerificationCode;

public interface VerifyCodeService {

     void delete (VerificationCode verificationCode);

     VerificationCode findByEmail(String email);

     VerificationCode save(VerificationCode verificationCode);

     Boolean isTimeOutRequired(VerificationCode verificationCode, long ms);

     User verifyRegister(String code);

     User verifyForgotPassword(VerifyNewPasswordRequest request);
}
