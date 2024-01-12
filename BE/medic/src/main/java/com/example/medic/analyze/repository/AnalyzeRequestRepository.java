package com.example.medic.analyze.repository;

import com.example.medic.analyze.domain.AnalyzeRequest;
import com.example.medic.analyze.domain.AnalyzeRequestList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnalyzeRequestRepository extends JpaRepository<AnalyzeRequest,Long> {

    List<AnalyzeRequest> findAllByAnalyzeRequestList(AnalyzeRequestList analyzeRequestList);
}
