package com.example.medic.translation.repository;

import com.example.medic.translation.domain.TranslationRequestFile;
import com.example.medic.translation.domain.TranslationRequestList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TranslationRequestFileRepository extends JpaRepository<TranslationRequestFile,Long> {

    TranslationRequestFile findByTranslationRequestList(TranslationRequestList translationRequestList);
}
