package com.example.medic.translation.repository;

import com.example.medic.translation.domain.TranslationAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TranslationAssignmentRepository extends JpaRepository<TranslationAssignment,Long> {
}
