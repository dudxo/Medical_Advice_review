package com.example.medic.manager.dto;

import lombok.Data;

import java.util.Date;

@Data
public class TranslateListDto {
    private Long trId;
    private String trPtDiagnosis;

    private Date trRegDate;
    private String uName;
    private Date tamDate;
    private Date trAnswerDate;
    private String trProgressStatus;
    private String cName;

    public TranslateListDto(Long trId,  String trPtDiagnosis,
                          Date trRegDate, String uName, Date tamDate, Date trAnswerDate,
                          String trProgressStatus, String cName) {
        this.trId = trId;
        this.trPtDiagnosis = trPtDiagnosis;
        this.trRegDate = trRegDate;
        this.uName = uName;
        this.tamDate = tamDate;
        this.trAnswerDate = trAnswerDate;
        this.trProgressStatus = trProgressStatus;
        this.cName = cName;
    }
}
