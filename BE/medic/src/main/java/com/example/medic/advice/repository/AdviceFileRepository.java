package com.example.medic.advice.repository;

import com.example.medic.advice.domain.AdviceFile;
import com.example.medic.advice.domain.AdviceRequestList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdviceFileRepository  extends JpaRepository<AdviceFile, Long> {
    AdviceFile findByAdviceRequestList(AdviceRequestList adviceRequestList);
}
