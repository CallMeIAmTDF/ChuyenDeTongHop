package com.huce.edu_v2.service.impl;

import com.huce.edu_v2.dto.request.auth.InvalidatedTokenRequest;
import com.huce.edu_v2.service.InvalidatedTokenService;
import com.huce.edu_v2.service.base.impl.BaseRedisServiceImplV2;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class InvalidatedTokenServiceImpl extends BaseRedisServiceImplV2<String, String, String> implements InvalidatedTokenService {
    public InvalidatedTokenServiceImpl(RedisTemplate<String, String> redisTemplate, HashOperations<String, String, String> hashOperations) {
        super(redisTemplate, hashOperations);
    }

    @Override
    public void createInvalidatedToken(InvalidatedTokenRequest invalidatedTokenRequest){
        this.set(invalidatedTokenRequest.getId(), "");
        this.setTimeToLive(invalidatedTokenRequest.getId(),
                invalidatedTokenRequest.getExpiryTime().getEpochSecond() - Instant.now().getEpochSecond());
    }

    @Override
    public boolean existById(String id){
        return this.hashExist(id);
    }
}
