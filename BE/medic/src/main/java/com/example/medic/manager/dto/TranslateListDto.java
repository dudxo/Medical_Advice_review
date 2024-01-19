package com.example.medic.manager.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
public class TranslateListDto {
    private Long trId;
    private String trPtDiagnosis;

    private LocalDate trRegDate;
    private String uName;
    private LocalDate tamDate;
    private LocalDate trAnswerDate;
    private String trProgressStatus;
    private String cName;

    public TranslateListDto(Long trId,  String trPtDiagnosis,
                          LocalDate trRegDate, String uName, LocalDate tamDate, LocalDate trAnswerDate,
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
