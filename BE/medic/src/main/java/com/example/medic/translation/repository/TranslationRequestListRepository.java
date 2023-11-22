package com.example.medic.translation.repository;

import com.example.medic.translation.domain.TranslationRequestList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TranslationRequestListRepository extends JpaRepository<TranslationRequestList,Long> {
}
