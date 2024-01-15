package com.example.medic.translation.service;

import com.example.medic.translation.domain.TranslationRequestList;
import com.example.medic.translation.dto.TranslationSituationDto;
import com.example.medic.translation.repository.TranslationRequestListRepository;
import com.example.medic.client.dto.ClientInfoDto;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@AllArgsConstructor
public class TranslationSituationService {

    private final Logger logger = LoggerFactory.getLogger(com.example.medic.translation.service.TranslationSituationService.class);
    private final TranslationRequestListRepository translationRequestListRepository;

    public List<TranslationSituationDto> getTranslationSituationList(String trPtSub, String trPtDiagnosis,
                                                             Date trRegDate, ClientInfoDto clientInfoDto) {
        try {
            String uid = clientInfoDto.getUId();

            List<TranslationRequestList> translationRequestList = translationRequestListRepository.findByClient_UId(uid);

            return translationRequestList.stream()
                    .map(TranslationSituationDto::from)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("TranslationSituationList 조회 중 오류 발생", e);
        }
    }


    public int getTranslationCount(String uid) {
        try {
            List<TranslationRequestList> translationRequestList = translationRequestListRepository.findByClient_UId(uid);

            return translationRequestList.size();
        } catch (Exception e) {
            throw new RuntimeException("AdviceRequestList 건수 조회 중 오류 발생");
        }
    }
}

