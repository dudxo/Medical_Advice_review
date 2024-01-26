package com.example.medic.analyze.dto;

import com.example.medic.analyze.domain.AnalyzeRequestList;
import com.example.medic.analyze.dto.AnalyzeSituationDto;
import com.example.medic.analyze.domain.AnalyzeRequestList;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Builder
public class AnalyzeSituationDto {

    private Long anId;
    private String anPtSub;
    private String anPtDiagnosis;
    private LocalDate anRegDate;
    private LocalDate adMdDate;
    private LocalDate anAnswerDate;
    private String anProgressStatus;

    public AnalyzeSituationDto(Long anId, String anPtSub, String anPtDiagnosis, LocalDate anRegDate, LocalDate adMdDate,
                               LocalDate anAnswerDate, String anProgressStatus) {
        this.anId = anId;
        this.anPtSub = anPtSub;
        this.anPtDiagnosis = anPtDiagnosis;
        this.anRegDate = anRegDate;
        this.adMdDate = adMdDate;
        this.anAnswerDate = anAnswerDate;
        this.anProgressStatus = anProgressStatus;
    }
}
