package com.huce.edu_v2.service.base;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface BaseRedisServiceV2<K, F, V> {
    void set(K key, V value);

    void setTimeToLive(K key, long timeout);

    void hashSet(K key, F field, V value);

    Long hashIncrBy(K key, F field, long delta);

    boolean hashExist(K key);

    boolean hashExist(K key, F field);

    V get(K key);

    Map<F, V> getField(K key);

    V hashGet(K key, F field);

    List<V> hashGetByFieldPrefix(K key, F fieldPrefix);

    Set<F> getFieldPrefix(K key);

    void delete(K key);

    void delete(K key, F field);

    void delete(K key, List<F> fields);
}
