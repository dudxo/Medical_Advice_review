package com.example.medic.qna.repository;

import com.example.medic.qna.domain.Qna;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QnaRepository extends JpaRepository<Qna,Long> {
}
