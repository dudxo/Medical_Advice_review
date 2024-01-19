package com.example.medic.manager.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;
import java.util.StringJoiner;

@Data
public class AdDetailDto {

    private String adPtName;

    private String adPtSsNum;

    private String adPtSub;

    private String adPtDiagnosis;

    private String adPtRec;

    private String adPtCmt;

    private String insurance;

    private String insureDate;

    private String insureName;

    private String adEtc;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date adRegDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date adMdDate;

    private String uId;
    private String uName;
    private String userAddress;
    private String userPhone;
    private String userTel;


    private String hospital;

    private String admStart;

    private String admEnd;

    private String visitStart;

    private String visitEnd;

    private String treatCmt;

    private int diagRound;

    private List<String> adQuestionContent;

    private String adAnswerContent;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date adAnswerDate;


    @Builder
    public AdDetailDto(String adPtName, String adPtSsNum, String adPtSub, String adPtDiagnosis,
                       String adPtRec, String adPtCmt, String insurance, String insureDate,
                       String insureName, String adEtc, Date adRegDate, Date adMdDate,
                       String uId, String uName, String userAddress, String userPhone, String userTel,
                        String hospital, String admStart, String admEnd, String visitStart, String visitEnd, String treatCmt,
                       int diagRound , List<String> adQuestionContent, String adAnswerContent) {
        this.adPtName = adPtName;
        this.adPtSsNum = adPtSsNum;
        this.adPtSub = adPtSub;
        this.adPtDiagnosis = adPtDiagnosis;
        this.adPtRec = adPtRec;
        this.adPtCmt = adPtCmt;
        this.insurance =insurance;
        this.insureDate = insureDate;
        this.insureName = insureName;
        this.adEtc = adEtc;
        this.adRegDate = adRegDate;
        this.adMdDate = adMdDate;
        this.uId = uId;
        this.userAddress = userAddress;
        this.userPhone = userPhone;
        this.userTel = userTel;
        this.uName = uName;

        this.hospital = hospital;
        this.admStart = admStart;
        this.admEnd = admEnd;
        this.visitStart =visitStart;
        this.visitEnd = visitEnd;
        this.treatCmt = treatCmt;
        this.diagRound = diagRound;

        this.adQuestionContent = adQuestionContent;
        this.adAnswerContent = adAnswerContent;
    }


}
