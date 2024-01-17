package com.example.medic.analyze.dto;

import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.advice.dto.AdviceSituationDto;
import com.example.medic.analyze.domain.AnalyzeRequestList;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Builder
public class AnalyzeSituationDto {

    private String anPtSub;
    private String anPtDiagnosis;
    private LocalDate anRegDate;

    private Long anId;

    public static AnalyzeSituationDto from(AnalyzeRequestList analyzeRequestList) {
        return AnalyzeSituationDto.builder()
                .anPtSub(analyzeRequestList.getAnPtSub())
                .anPtDiagnosis(analyzeRequestList.getAnPtDiagnosis())
                .anRegDate(analyzeRequestList.getAnRegDate())
                .build();
    }
}
