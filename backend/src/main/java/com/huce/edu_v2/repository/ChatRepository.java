package com.huce.edu_v2.repository;

import com.huce.edu_v2.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
	List<Chat> findByUserIdOrAdminId(String userId, String adminId);

	List<Chat> findByUserId(String userId);

	@Query("SELECT cm.id " +
            "FROM Chat cm " +
            "WHERE cm.timestamp = (SELECT MAX(subcm.timestamp) " +
            "FROM Chat subcm WHERE " +
            "subcm.userId = cm.userId ) " +
            "ORDER BY cm.timestamp DESC")
	List<Object[]> findAllUserIdsAndLatestMessage();

	List<Chat> findByIdIn(List<Long> cid);
}