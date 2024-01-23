package com.example.medic.medicalKnowledge.repository;

import com.example.medic.medicalKnowledge.domain.IndustrialAccidentInfo;
import com.example.medic.medicalKnowledge.domain.TrafficAccidentInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrafficAccidentInfoJpaRepository extends JpaRepository<TrafficAccidentInfo, Long> {

    /**
     * 검색 기능
     */
    List<TrafficAccidentInfo> findByTaNameContaining(String keyword);
}
