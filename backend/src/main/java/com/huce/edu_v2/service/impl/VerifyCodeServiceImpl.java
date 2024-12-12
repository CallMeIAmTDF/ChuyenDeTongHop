package com.huce.edu_v2.service.impl;

import com.huce.edu_v2.advice.AppException;
import com.huce.edu_v2.advice.ErrorCode;
import com.huce.edu_v2.advice.exception.ResourceNotFoundException;
import com.huce.edu_v2.dto.request.auth.VerifyNewPasswordRequest;
import com.huce.edu_v2.entity.User;
import com.huce.edu_v2.entity.VerificationCode;
import com.huce.edu_v2.repository.UserRepository;
import com.huce.edu_v2.repository.VerifyCodeRepository;
import com.huce.edu_v2.service.VerifyCodeService;
import com.huce.edu_v2.util.constant.VerifyTypeEnum;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class VerifyCodeServiceImpl implements VerifyCodeService {
    VerifyCodeRepository verifyCodeRepository;
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    @NonFinal
    @Value("${auth.verify.register-code-duration}")
    protected long REGISTER_CODE_DURATION;

    @NonFinal
    @Value("${auth.verify.forgot-password-code-duration}")
    protected long FORGOT_PASSWORD_CODE_DURATION;

    /**
     * @param verificationCode
     * @return
     */
    @Override
    public void delete(VerificationCode verificationCode) {
        verifyCodeRepository.delete(verificationCode);
    }

    /**
     * @param email
     * @return
     */
    @Override
    public VerificationCode findByEmail(String email) {
         return verifyCodeRepository.findFirstByEmail(email).orElse(null);
    }

    /**
     * @param verificationCode
     * @return
     */
    @Override
    public VerificationCode save(VerificationCode verificationCode) {
        return verifyCodeRepository.save(verificationCode);
    }

    /**
     * @param verificationCode
     * @param ms
     * @return
     */
    @Override
    public Boolean isTimeOutRequired(VerificationCode verificationCode, long ms) {
        if (verificationCode.getCode() == null) {
            return true;
        }

        long currentTimeInMillis =LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
        long otpRequestedTimeInMillis = verificationCode.getExp().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();

        return otpRequestedTimeInMillis + ms <= currentTimeInMillis;
    }

    /**
     * @param code
     */
    @Override
    public User verifyRegister(String code) {
        VerificationCode verificationCode = verifyCodeRepository.findFirstByCodeAndType(code, VerifyTypeEnum.REGISTER).orElseThrow(
                () -> new AppException(ErrorCode.VERIFY_FAILED)
        );

        if (isTimeOutRequired(verificationCode, REGISTER_CODE_DURATION))
            throw new AppException(ErrorCode.VERIFY_EXPIRED);

        User userByEmail = userRepository.findByEmail(verificationCode.getEmail()).orElseThrow(
                () -> new ResourceNotFoundException("User", "email", verificationCode.getEmail())
        );

        if (userByEmail.getActive()) throw new AppException(ErrorCode.VERIFY_FAILED);

        userByEmail.setActive(true);
        userRepository.save(userByEmail);

        return userByEmail;
    }


    /**
     * @param request
     * @return
     */
    @Override
    public User verifyForgotPassword(VerifyNewPasswordRequest request) {
        VerificationCode verificationCode = verifyCodeRepository.findFirstByCodeAndType(request.getCode(), VerifyTypeEnum.FORGOT_PASSWORD).orElseThrow(
                () -> new AppException(ErrorCode.VERIFY_FAILED)
        );

        if (isTimeOutRequired(verificationCode, FORGOT_PASSWORD_CODE_DURATION))
            throw new AppException(ErrorCode.VERIFY_EXPIRED);

        User userByEmail = userRepository.findByEmail(verificationCode.getEmail()).orElseThrow(
                () -> new ResourceNotFoundException("User", "email", verificationCode.getEmail())
        );

        userByEmail.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(userByEmail);
        verifyCodeRepository.delete(verificationCode);

        return userByEmail;
    }
}
