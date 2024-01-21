package com.example.medic.medicalKnowledge.repository;

import com.example.medic.medicalKnowledge.domain.MedicalNegligenceInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicalNegligenceInfoRepository extends JpaRepository<MedicalNegligenceInfo,Long> {

    /**
     * 검색 기능
     */
    List<MedicalNegligenceInfo> findByMnNameContaining(String keyword);
}
