package com.example.medic.translation.repository;

import com.example.medic.consultative.domain.Consultative;
import com.example.medic.translation.domain.TranslationAssignment;
import com.example.medic.translation.domain.TranslationRequestList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TranslationAssignmentRepository extends JpaRepository<TranslationAssignment,Long> {

    int countAllByConsultative(Consultative consultative);

    List<TranslationRequestList> findAllTranslationRequestListByConsultative(Consultative findConsultative);
}
