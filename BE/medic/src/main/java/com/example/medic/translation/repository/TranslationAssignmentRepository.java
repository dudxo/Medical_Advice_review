package com.example.medic.translation.repository;

<<<<<<< HEAD
import com.example.medic.consultative.domain.Consultative;
=======
import com.example.medic.analyze.domain.AnalyzeAssignment;
>>>>>>> feature-faqpage-m
import com.example.medic.translation.domain.TranslationAssignment;
import com.example.medic.translation.domain.TranslationRequestList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TranslationAssignmentRepository extends JpaRepository<TranslationAssignment,Long> {
<<<<<<< HEAD

    int countAllByConsultative(Consultative consultative);

    List<TranslationRequestList> findAllTranslationRequestListByConsultative(Consultative findConsultative);
=======
    @Query("SELECT tr FROM TranslationAssignment tr WHERE tr.translationRequestList.trId = :trId")
    TranslationAssignment findByTrId(@Param("trId") Long trId);
>>>>>>> feature-faqpage-m
}
