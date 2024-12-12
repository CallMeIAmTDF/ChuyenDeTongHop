package com.huce.edu_v2.service.impl;

import com.huce.edu_v2.dto.response.game.UserResponse;
import com.huce.edu_v2.entity.User;
import com.huce.edu_v2.service.UserPointsService;
import com.huce.edu_v2.service.UserService;
import com.huce.edu_v2.service.base.impl.BaseRedisServiceImplV2;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserPointsServiceImpl extends BaseRedisServiceImplV2<String, String, Integer> implements UserPointsService {
	final UserService userService;
	public UserPointsServiceImpl(RedisTemplate<String, Integer> redisTemplate, HashOperations<String, String, Integer> hashOperations, UserService userService) {
		super(redisTemplate, hashOperations);
		this.userService = userService;
	}

	@Override
	public Integer getUserPoint(String uid) {
		Integer point = this.hashGet("points", uid);
		if(point == null){
			this.hashSet("points", uid, 1000);
			return 1000;
		}
		return point;
	}

	@Override
	public List<UserResponse> getTopUsers(Integer limit) {
		return this.getField("points").entrySet().stream()
				.sorted((e1, e2) -> e2.getValue().compareTo(e1.getValue()))
				.limit(limit)
				.map(e -> {
					User u = userService.fetchUserById(e.getKey());
					return new UserResponse(u.getName(), u.getImage() == null ? "https://ui-avatars.com/api/?background=random&format=png&name="+u.getName() : u.getImage(), e.getValue());
				})
				.collect(Collectors.toList());
	}

	@Override
	public Long updateUserPoint(String uid, Long delta) {
		Integer point = this.hashGet("points", uid);
		if(point == null){
			this.hashSet("points", uid, 1000);
		}
		return this.hashIncrBy("points", uid, delta);
	}
}
