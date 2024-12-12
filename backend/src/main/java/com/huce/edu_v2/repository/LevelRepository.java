package com.huce.edu_v2.repository;

import com.huce.edu_v2.entity.Level;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LevelRepository extends JpaRepository<Level, Integer>, JpaSpecificationExecutor<Level> {
	boolean existsByLname(String lname);

	boolean existsByLid(int id);

	@Query("SELECT l, " +
			"COALESCE(CAST(SUM(CASE WHEN h.iscorrect = 1 AND h.uid = :uid THEN 1 ELSE 0 END) * 1.0 / COUNT(DISTINCT w.wid) AS FLOAT), 0) AS progress, " +
			"COUNT(DISTINCT t.tid) AS numTopics, " +
			"COUNT(DISTINCT w.wid) AS numWords " +
			"FROM Level l " +
			"LEFT JOIN Topic t ON l.lid = t.level.lid " +
			"LEFT JOIN Word w ON t.tid = w.topic.tid " +
			"LEFT JOIN History h ON w.wid = h.word.wid AND h.uid = :uid " +
			"GROUP BY l.lid"
	)
	List<Object[]> findAllLevelsWithProgressForUser(String uid);
}

