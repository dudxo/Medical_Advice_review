package com.example.medic.manager.dto;

import lombok.Getter;
import lombok.ToString;

import java.util.Date;

@Getter
public class AdviceListDto {

    private Long adId;
    private String adPtDiagnosis;

    private Date adRegDate;
    private String uName;
    private Date admDate;
    private Date adAnswerDate;
    private String admProgressStatus;
    private String cName;

    public AdviceListDto(Long adId,   String adPtDiagnosis,
                                 Date adRegDate, String uName, Date amdDate, Date adAnswerDate,
                            String admProgressStatus, String cName) {
        this.adId = adId;
        this.adPtDiagnosis = adPtDiagnosis;
        this.adRegDate = adRegDate;
        this.uName = uName;
        this.admDate = amdDate;
        this.adAnswerDate = adAnswerDate;
        this.admProgressStatus = admProgressStatus;
        this.cName = cName;
    }
}
