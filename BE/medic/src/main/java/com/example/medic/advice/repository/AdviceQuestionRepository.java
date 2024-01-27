package com.example.medic.advice.repository;

import com.example.medic.advice.domain.AdviceAssignment;
import com.example.medic.advice.domain.AdviceQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AdviceQuestionRepository extends JpaRepository<AdviceQuestion, Long> {

    @Query("SELECT aa FROM AdviceQuestion aa WHERE aa.adviceRequestList.adId = :adId")
    AdviceQuestion findByAdId(@Param("adId") Long adId);

    @Query("SELECT aa FROM AdviceQuestion aa WHERE aa.adviceRequestList.adId = :adId")
    List<AdviceQuestion> findByAdIds(@Param("adId") Long adId);


}
