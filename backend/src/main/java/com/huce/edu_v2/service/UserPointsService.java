package com.huce.edu_v2.service;

import com.huce.edu_v2.dto.response.game.UserResponse;
import com.huce.edu_v2.service.base.BaseRedisServiceV2;

import java.util.List;

public interface UserPointsService extends BaseRedisServiceV2<String, String, Integer> {
	Integer getUserPoint(String uid);

	List<UserResponse> getTopUsers(Integer limit);

	Long updateUserPoint(String uid, Long delta);

}
