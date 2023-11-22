package com.example.medic.medicalKnowledge.repository;

import com.example.medic.medicalKnowledge.domain.WoundInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WoundInfoRepository extends JpaRepository<WoundInfo,Long> {
}
