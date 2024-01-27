package com.example.medic.analyze.repository;

import com.example.medic.advice.domain.AdviceQuestion;
import com.example.medic.analyze.domain.AnalyzeRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnalyzeRequestRepository extends JpaRepository<AnalyzeRequest,Long> {
    @Query("SELECT an FROM AnalyzeRequest an WHERE an.analyzeRequestList.anId = :anId")
    AnalyzeRequest findByAnId(@Param("anId") Long anId);

    @Query("SELECT an FROM AnalyzeRequest an WHERE an.analyzeRequestList.anId = :anId")
    List<AnalyzeRequest> findByAnIds(@Param("anId") Long anId);
}
