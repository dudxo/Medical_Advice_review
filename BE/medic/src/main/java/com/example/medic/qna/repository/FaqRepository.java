package com.example.medic.qna.repository;

import com.example.medic.qna.domain.Faq;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FaqRepository extends JpaRepository<Faq,Long> {
}
