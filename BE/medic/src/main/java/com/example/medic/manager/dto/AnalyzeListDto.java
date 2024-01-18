package com.example.medic.manager.dto;

import lombok.Data;

import java.util.Date;

@Data
public class AnalyzeListDto {
    private Long anId;
    private String anPtDiagnosis;

    private Date anRegDate;
    private String uName;
    private Date adMdDate;
    private Date anAnswerDate;
    private String anProgressStatus;
    private String cName;

    public AnalyzeListDto(Long anId,  String anPtDiagnosis,
                         Date anRegDate, String uName, Date adMdDate, Date anAnswerDate,
                         String anProgressStatus, String cName) {
        this.anId = anId;
        this.anPtDiagnosis = anPtDiagnosis;
        this.anRegDate = anRegDate;
        this.uName = uName;
        this.adMdDate = adMdDate;
        this.anAnswerDate = anAnswerDate;
        this.anProgressStatus = anProgressStatus;
        this.cName = cName;
    }
}
