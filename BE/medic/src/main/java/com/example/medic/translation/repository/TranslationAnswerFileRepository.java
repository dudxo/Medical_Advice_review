package com.example.medic.translation.repository;

import com.example.medic.analyze.domain.AnalyzeAssignment;
import com.example.medic.translation.domain.TranslationAnswerFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TranslationAnswerFileRepository extends JpaRepository<TranslationAnswerFile,Long> {

}
