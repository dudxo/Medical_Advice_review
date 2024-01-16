package com.example.medic.advice.repository;

import com.example.medic.advice.domain.AdviceQuestion;
import com.example.medic.advice.domain.AdviceRequestList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdviceQuestionRepository extends JpaRepository<AdviceQuestion, Long> {
    List<AdviceQuestion> findAllByAdviceRequestList(AdviceRequestList adviceRequestList);
}
