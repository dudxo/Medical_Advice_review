package com.example.medic.advice.repository;

import com.example.medic.advice.domain.AdviceQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdviceQuestionRepository extends JpaRepository<AdviceQuestion, Long> {
}
