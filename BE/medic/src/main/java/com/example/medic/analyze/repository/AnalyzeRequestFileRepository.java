package com.example.medic.analyze.repository;

import com.example.medic.analyze.domain.AnalyzeRequest;
import com.example.medic.analyze.domain.AnalyzeRequestFile;
import com.example.medic.analyze.domain.AnalyzeRequestList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnalyzeRequestFileRepository extends JpaRepository<AnalyzeRequestFile, Long> {

    AnalyzeRequestFile findByAnalyzeRequestList(AnalyzeRequestList analyzeRequestList);

}
