package com.example.medic.translation.repository;

<<<<<<< HEAD
import com.example.medic.client.domain.Client;
import com.example.medic.consultative.domain.Consultative;
=======
import com.example.medic.analyze.domain.AnalyzeRequest;
import com.example.medic.analyze.domain.AnalyzeRequestList;
import com.example.medic.client.domain.Client;
import com.example.medic.translation.domain.TranslationRequestFile;
>>>>>>> feature-faqpage-m
import com.example.medic.translation.domain.TranslationRequestList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TranslationRequestListRepository extends JpaRepository<TranslationRequestList,Long> {

    @Query("SELECT trl FROM TranslationRequestList trl WHERE trl.client.uId = :uId")
    List<TranslationRequestList> findByClient_UId(String uId);



    int countAllByClient(Client client);

    TranslationRequestList findByTrPtName(String trPtName);

    Client findClientByTrId(Long trId);
}
