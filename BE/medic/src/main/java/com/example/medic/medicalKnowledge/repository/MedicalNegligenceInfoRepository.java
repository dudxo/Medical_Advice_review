package com.example.medic.medicalKnowledge.repository;

import com.example.medic.medicalKnowledge.domain.MedicalNegligenceInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicalNegligenceInfoRepository extends JpaRepository<MedicalNegligenceInfo,Long> {
}
