package com.example.medic.translation.repository;

import com.example.medic.translation.domain.TranslationAnswerFile;
import com.example.medic.translation.domain.TranslationRequestList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TranslationAnswerFileRepository extends JpaRepository<TranslationAnswerFile,Long> {
    TranslationAnswerFile findByTranslationRequestList(TranslationRequestList translationRequestList);
}
