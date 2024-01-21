package com.example.medic.manager.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.Date;

@Getter
public class AdviceListDto {

    private Long adId;
    private String adPtDiagnosis;

    private LocalDate adRegDate;
    private String uName;
    private LocalDate adMdDate;
    private LocalDate adAnswerDate;
    private String admProgressStatus;
    private String cName;
    private Long admId;

    @Builder
    public AdviceListDto(Long adId,   String adPtDiagnosis,
                                 LocalDate adRegDate, String uName, LocalDate adMdDate, LocalDate adAnswerDate,
                            String admProgressStatus, String cName, Long admId) {
        this.adId = adId;
        this.adPtDiagnosis = adPtDiagnosis;
        this.adRegDate = adRegDate;
        this.uName = uName;
        this.adMdDate = adMdDate;
        this.adAnswerDate = adAnswerDate;
        this.admProgressStatus = admProgressStatus;
        this.cName = cName;
        this.admId=admId;
    }
}
