package com.example.medic.medicalKnowledge.repository;

import com.example.medic.medicalKnowledge.domain.IndustrialAccidentInfo;
import com.example.medic.medicalKnowledge.domain.MedicalNegligenceInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IndustrialAccidentInfoRepository extends JpaRepository<IndustrialAccidentInfo, Long> {

    /**
     * 검색 기능
     */
    List<IndustrialAccidentInfo> findByIaNameContaining(String keyword);
}
