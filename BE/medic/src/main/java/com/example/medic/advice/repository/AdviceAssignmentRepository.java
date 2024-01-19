package com.example.medic.advice.repository;

import com.example.medic.advice.domain.AdviceAssignment;
import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.consultative.domain.Consultative;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import java.util.List;

public interface AdviceAssignmentRepository extends JpaRepository<AdviceAssignment, Long> {

<<<<<<< HEAD
    int countAllByConsultative(Consultative consultative);

    List<AdviceRequestList> findAllAdviceRequestListByConsultative(Consultative consultative);
=======
    @Query("SELECT aa FROM AdviceAssignment aa WHERE aa.adviceRequestList.adId = :adId")
    AdviceAssignment findByAdId(@Param("adId") Long adId);
>>>>>>> feature-faqpage-m

}
