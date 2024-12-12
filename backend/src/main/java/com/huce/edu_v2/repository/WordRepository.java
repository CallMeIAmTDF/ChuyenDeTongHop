package com.huce.edu_v2.repository;

import com.huce.edu_v2.entity.Topic;
import com.huce.edu_v2.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WordRepository extends JpaRepository<Word, Integer>, JpaSpecificationExecutor<Word> {
    Word findFirstByWid(Integer wid);

    @Query(
            "SELECT w " +
                    "FROM Word w " +
                    "JOIN History h ON w.wid = h.word.wid " +
                    "WHERE h.uid = :uid " +
                    "GROUP BY w.wid"
    )
    List<Word> findWordsByUserHistory(String uid);

    @Query(value = "SELECT w FROM Word w WHERE w.topic.tid = ?1 ORDER BY RAND() LIMIT 3")
    List<Word> get3RandomWordsByTid(Integer tid);

    Optional<Word> findFirstByWidGreaterThanAndTopic(Integer wid, Topic topic);

    Word findByWid(Integer wid);

    List<Word> findWordsByTopic(Topic topic);
}