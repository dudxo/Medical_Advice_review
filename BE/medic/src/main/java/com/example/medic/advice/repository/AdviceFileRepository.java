package com.example.medic.advice.repository;

import com.example.medic.advice.domain.AdviceFile;
import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.advice.dto.AdviceFileResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AdviceFileRepository  extends JpaRepository<AdviceFile, Long> {
    AdviceFile findByAdviceRequestList(AdviceRequestList adviceRequestList);
    @Query("SELECT adf.fid FROM AdviceFile adf WHERE adf.adviceRequestList.adId = :adId")
    Long findByFileId(Long adId);

}
