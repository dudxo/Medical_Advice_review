package com.example.medic.translation.repository;

import com.example.medic.analyze.domain.AnalyzeAssignment;
import com.example.medic.translation.domain.TranslationAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TranslationAssignmentRepository extends JpaRepository<TranslationAssignment,Long> {
    @Query("SELECT tr FROM TranslationAssignment tr WHERE tr.translationRequestList.trId = :trId")
    TranslationAssignment findByTrId(@Param("trId") Long trId);
}
