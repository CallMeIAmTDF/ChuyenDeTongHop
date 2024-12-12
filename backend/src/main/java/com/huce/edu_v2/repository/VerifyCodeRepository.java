package com.huce.edu_v2.repository;

import com.huce.edu_v2.entity.VerificationCode;
import com.huce.edu_v2.util.constant.VerifyTypeEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface VerifyCodeRepository extends JpaRepository<VerificationCode, String> {
    boolean existsByEmail(String email);

    Optional<VerificationCode> findFirstByCodeAndType(String code, VerifyTypeEnum type);

    Optional<VerificationCode> findFirstByEmail(String email);
}
