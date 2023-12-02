package com.example.medic.translation.service;

import com.example.medic.analyze.domain.AnalyzeRequestList;
import com.example.medic.analyze.repository.AnalyzeRequestListRepository;
import com.example.medic.translation.domain.TranslationRequestList;
import com.example.medic.translation.repository.TranslationRequestListRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class TranslationSituationService {

    private final Logger logger = LoggerFactory.getLogger(com.example.medic.translation.service.TranslationSituationService.class);
    private final TranslationRequestListRepository translationRequestListRepository;

    public int getTranslationCount(String uid) {
        try {
            List<TranslationRequestList> translationRequestList = translationRequestListRepository.findByClient_UId(uid);

            return translationRequestList.size();
        } catch (Exception e) {
            throw new RuntimeException("AdviceRequestList 건수 조회 중 오류 발생");
        }
    }
}

