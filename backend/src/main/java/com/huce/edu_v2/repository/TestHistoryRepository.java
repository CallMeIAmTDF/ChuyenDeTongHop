package com.huce.edu_v2.repository;

import com.huce.edu_v2.entity.TestHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface TestHistoryRepository extends JpaRepository<TestHistory, Integer> {
	List<TestHistory> findTestHistoriesByUid(String uid);
}
