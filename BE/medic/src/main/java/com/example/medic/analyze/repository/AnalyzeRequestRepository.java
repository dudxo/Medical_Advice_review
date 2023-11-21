package com.example.medic.analyze.repository;

import com.example.medic.analyze.domain.AnalyzeRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnalyzeRequestRepository extends JpaRepository<AnalyzeRequest,Long> {
}
