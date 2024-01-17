package com.example.medic.analyze.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.Date;
import java.util.List;

@Getter
@Builder
public class AnalyzeResponseDto {
    private Long anId;

    private String anPtName;

    private String anPtSsNum;

    private String anPtSub;

    private String anPtDiagnosis;

    private String anPtDiagContent;

    private String anEtc;

    private Date anRegDate;

    private Date anMdDate;

    private List<String> anQuestionContent;

    private List<String> anAnswerContent;

    private String anReqForm;

    private String anDiagnosis;

    private String anRecord;

    private String anFilm;

    private String anOther;

    private String uName;

    private String userTel;

    private String userPhone;

    private String userAddress;
}
