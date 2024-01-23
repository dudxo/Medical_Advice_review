package com.example.medic.medicalKnowledge.repository;

import com.example.medic.medicalKnowledge.domain.TrafficAccidentInfo;
import com.example.medic.medicalKnowledge.domain.WoundInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WoundInfoRepository extends JpaRepository<WoundInfo,Long> {

    /**
     * 검색 기능
     */
    List<WoundInfo> findByWoNameContaining(String keyword);
}
