package com.example.medic.analyze.service;

import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.advice.service.AdviceService;
import com.example.medic.analyze.domain.AnalyzeRequestList;
import com.example.medic.analyze.repository.AnalyzeRequestListRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class AnalyzeSituationService {

    private final Logger logger = LoggerFactory.getLogger(AnalyzeSituationService.class);
    private final AnalyzeRequestListRepository analyzeRequestListRepository;

    public int getAnalyzeCount(String uid) {
        try {
            List<AnalyzeRequestList> analyzeRequestList = analyzeRequestListRepository.findByClient_UId(uid);

            return analyzeRequestList.size();
        } catch (Exception e) {
            throw new RuntimeException("AdviceRequestList 건수 조회 중 오류 발생");
        }
    }
}
