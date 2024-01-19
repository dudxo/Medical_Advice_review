package com.example.medic.advice.repository;

import com.example.medic.advice.domain.AdviceAssignment;
import com.example.medic.advice.domain.AdviceQuestion;
import com.example.medic.advice.domain.AdviceRequestList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AdviceQuestionRepository extends JpaRepository<AdviceQuestion, Long> {
<<<<<<< HEAD
    List<AdviceQuestion> findAllByAdviceRequestList(AdviceRequestList adviceRequestList);
=======

    @Query("SELECT aa FROM AdviceQuestion aa WHERE aa.adviceRequestList.adId = :adId")
    AdviceQuestion findByAdId(@Param("adId") Long adId);
>>>>>>> feature-faqpage-m
}
