package com.example.medic.analyze.repository;

<<<<<<< HEAD
import com.example.medic.advice.domain.AdviceRequestList;
=======
import com.example.medic.advice.domain.AdviceAssignment;
>>>>>>> feature-faqpage-m
import com.example.medic.analyze.domain.AnalyzeAssignment;
import com.example.medic.analyze.domain.AnalyzeRequestList;
import com.example.medic.consultative.domain.Consultative;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnalyzeAssignmentRepository extends JpaRepository<AnalyzeAssignment,Long> {
<<<<<<< HEAD

    int countAllByConsultative(Consultative consultative);

    List<AnalyzeRequestList> findAllAnalyzeRequestListByConsultative(Consultative consultative);
=======
    @Query("SELECT an FROM AnalyzeAssignment an WHERE an.analyzeRequestList.anId = :anId")
    AnalyzeAssignment findByAnId(@Param("anId") Long anId);

>>>>>>> feature-faqpage-m
}
