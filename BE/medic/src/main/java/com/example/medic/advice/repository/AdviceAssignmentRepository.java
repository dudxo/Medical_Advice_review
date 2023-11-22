package com.example.medic.advice.repository;

import com.example.medic.advice.domain.AdviceAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdviceAssignmentRepository extends JpaRepository<AdviceAssignment, Long> {
}
