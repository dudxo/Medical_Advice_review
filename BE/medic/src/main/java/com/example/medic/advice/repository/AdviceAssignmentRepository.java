package com.example.medic.advice.repository;

import com.example.medic.advice.domain.AdviceAssignment;
import com.example.medic.consultative.domain.Consultative;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdviceAssignmentRepository extends JpaRepository<AdviceAssignment, Long> {

    int countAllByConsultative(Consultative consultative);
}
