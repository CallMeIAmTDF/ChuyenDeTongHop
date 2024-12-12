package com.huce.edu_v2.repository;

import com.huce.edu_v2.entity.History;
import com.huce.edu_v2.entity.Topic;
import com.huce.edu_v2.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<History, Integer>, JpaSpecificationExecutor<Topic> {
	History findFirstByUidAndWord(String uid, Word word);

	@Query(value = "SELECT * FROM history WHERE DATE(datetime) BETWEEN :start AND :end ", nativeQuery = true)
	List<History> getWeekHistory(@Param("start") String start, @Param("end") String end);

	@Query(value =
			"SELECT l.lname, COALESCE(COUNT(h.hid), 0) FROM levels l " +
			"LEFT JOIN topics t ON l.lid = t.lid " +
			"LEFT JOIN words w ON t.tid = w.tid " +
			"LEFT JOIN history h ON w.wid = h.wid " +
			"AND DATE(h.datetime) BETWEEN :start AND :end " +
			"GROUP BY l.lid ", nativeQuery = true)
	List<Object[]> statisticsLevel(@Param("start") String start, @Param("end") String end);

	List<History> findByUid(String uid);
}
