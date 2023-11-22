package com.example.medic.medicalKnowledge.repository;

import com.example.medic.medicalKnowledge.domain.TrafficAccidentInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrafficAccidentInfoJpaRepository extends JpaRepository<TrafficAccidentInfo, Long> {
}
