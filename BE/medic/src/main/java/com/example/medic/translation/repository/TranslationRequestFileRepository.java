package com.example.medic.translation.repository;

import com.example.medic.translation.domain.TranslationRequestFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TranslationRequestFileRepository extends JpaRepository<TranslationRequestFile,Long> {
}
