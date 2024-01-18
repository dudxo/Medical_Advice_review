package com.example.medic.translation.repository;

import com.example.medic.translation.domain.TranslationRequestFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TranslationRequestFileRepository extends JpaRepository<TranslationRequestFile,Long> {
    @Query("SELECT tr FROM TranslationRequestFile tr WHERE tr.translationRequestList.trId = :trId")
    TranslationRequestFile findByTrId(@Param("trId") Long trId);
}
