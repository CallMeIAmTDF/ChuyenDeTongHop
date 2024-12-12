package com.huce.edu_v2.service.base.impl;

import com.huce.edu_v2.service.base.BaseRedisServiceV2;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BaseRedisServiceImplV2<K, F, V> implements BaseRedisServiceV2<K, F, V> {
    RedisTemplate<K, V> redisTemplate;
    HashOperations<K, F, V> hashOperations;

    @Override
    public void set(K key, V value) {
        redisTemplate.opsForValue().set(key, value);
    }

    @Override
    public void setTimeToLive(K key, long timeout) {
        redisTemplate.expire(key, timeout, TimeUnit.SECONDS);
    }

    @Override
    public void hashSet(K key, F field, V value) {

        hashOperations.put(key, field, value);
    }

    @Override
    public Long hashIncrBy(K key, F field, long delta) {
        return this.hashOperations.increment(key, field, delta);
    }

    @Override
    public boolean hashExist(K key) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }

    @Override
    public boolean hashExist(K key, F field) {
        return hashOperations.hasKey(key, field);
    }

    @Override
    public V get(K key) {
        return redisTemplate.opsForValue().get(key);
    }

    @Override
    public Map<F, V> getField(K key) {
        return hashOperations.entries(key);
    }

    @Override
    public V hashGet(K key, F field) {
        return hashOperations.get(key, field);
    }

    @Override
    public List<V> hashGetByFieldPrefix(K key, F fieldPrefix) {
        List<V> objects = new ArrayList<>();
        Map<F, V> hashEntries = hashOperations.entries(key);

        for (Map.Entry<F, V> entry : hashEntries.entrySet()) {
            if (entry.getKey() instanceof String fieldKey && fieldPrefix instanceof String prefix && fieldKey.startsWith(prefix)) {
                objects.add(entry.getValue());
            } else if (entry.getKey() instanceof Integer fieldKey && fieldPrefix instanceof Integer prefix) {
                String stringFieldKey = fieldKey.toString();
                String stringPrefix = prefix.toString();
                if (stringFieldKey.startsWith(stringPrefix)) {
                    objects.add(entry.getValue());
                }
            }
        }

        return objects;
    }

    @Override
    public Set<F> getFieldPrefix(K key) {
        return hashOperations.entries(key).keySet();
    }

    @Override
    public void delete(K key) {
        redisTemplate.delete(key);
    }

    @Override
    public void delete(K key, F field) {
        hashOperations.delete(key, field);
    }

    @Override
    public void delete(K key, List<F> fields) {
        for (F field : fields) {
            hashOperations.delete(key, field);
        }
    }
}
