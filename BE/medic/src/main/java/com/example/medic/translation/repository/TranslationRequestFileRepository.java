package com.example.medic.translation.repository;

import com.example.medic.translation.domain.TranslationRequestFile;
import com.example.medic.translation.domain.TranslationRequestList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TranslationRequestFileRepository extends JpaRepository<TranslationRequestFile,Long> {
<<<<<<< HEAD

    TranslationRequestFile findByTranslationRequestList(TranslationRequestList translationRequestList);
=======
    @Query("SELECT tr FROM TranslationRequestFile tr WHERE tr.translationRequestList.trId = :trId")
    TranslationRequestFile findByTrId(@Param("trId") Long trId);
>>>>>>> feature-faqpage-m
}
