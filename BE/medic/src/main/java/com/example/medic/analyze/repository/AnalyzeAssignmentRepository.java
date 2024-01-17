package com.example.medic.analyze.repository;

import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.analyze.domain.AnalyzeAssignment;
import com.example.medic.analyze.domain.AnalyzeRequestList;
import com.example.medic.consultative.domain.Consultative;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnalyzeAssignmentRepository extends JpaRepository<AnalyzeAssignment,Long> {

    int countAllByConsultative(Consultative consultative);

    List<AnalyzeRequestList> findAllAnalyzeRequestListByConsultative(Consultative consultative);
}
