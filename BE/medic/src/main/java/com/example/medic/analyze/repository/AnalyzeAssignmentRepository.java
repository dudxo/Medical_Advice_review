package com.example.medic.analyze.repository;

import com.example.medic.advice.domain.AdviceAssignment;
import com.example.medic.analyze.domain.AnalyzeAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AnalyzeAssignmentRepository extends JpaRepository<AnalyzeAssignment,Long> {
    @Query("SELECT an FROM AnalyzeAssignment an WHERE an.analyzeRequestList.anId = :anId")
    AnalyzeAssignment findByAnId(@Param("anId") Long anId);

}
