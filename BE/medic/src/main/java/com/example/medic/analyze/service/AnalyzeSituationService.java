package com.example.medic.analyze.service;

import com.example.medic.analyze.domain.AnalyzeRequestList;
import com.example.medic.analyze.dto.AnalyzeSituationDto;
import com.example.medic.analyze.domain.AnalyzeRequestList;
import com.example.medic.analyze.repository.AnalyzeRequestListRepository;
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
public class AnalyzeSituationService {

    private final Logger logger = LoggerFactory.getLogger(AnalyzeSituationService.class);
    private final AnalyzeRequestListRepository analyzeRequestListRepository;

    public List<AnalyzeSituationDto> getAnalyzeSituationList(String adPtSub, String adPtDiagnosis,
                                                           Date adRegDate, ClientInfoDto clientInfoDto) {
        try {
            String uid = clientInfoDto.getUId();

            List<AnalyzeRequestList> analyzeRequestList = analyzeRequestListRepository.findByClient_UId(uid);

            return analyzeRequestList.stream()
                    .map(AnalyzeSituationDto::from)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("AnalyzeSituationList 조회 중 오류 발생", e);
        }
    }

    public int getAnalyzeCount(String uid) {
        try {
            List<AnalyzeRequestList> analyzeRequestList = analyzeRequestListRepository.findByClient_UId(uid);

            return analyzeRequestList.size();
        } catch (Exception e) {
            throw new RuntimeException("AnalyzeRequestList 건수 조회 중 오류 발생");
        }
    }
}
