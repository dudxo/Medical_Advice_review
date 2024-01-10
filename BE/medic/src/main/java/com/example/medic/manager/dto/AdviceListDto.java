package com.example.medic.manager.dto;

import lombok.Getter;

import java.util.Date;

@Getter
public class AdviceListDto {

    private Long adId;
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
    private Date adMdDate;
    private Date adRegDate;
    private String uName;

    public AdviceListDto(Long adId, String adPtName, String adPtSsNum, String adPtSub, String adPtDiagnosis,
                                String adPtRec, String adPtCmt, String insurance, String insureDate, String insureName,
                                String adEtc, Date adMdDate, Date adRegDate, String uName) {
        this.adId = adId;
        this.adPtName = adPtName;
        this.adPtCmt = adPtCmt;
        this.adPtSsNum = adPtSsNum;
        this.adPtSub = adPtSub;
        this.adPtDiagnosis = adPtDiagnosis;
        this.adPtRec = adPtRec;
        this.adEtc = adEtc;
        this.insurance = insurance;
        this.insureDate = insureDate;
        this.insureName = insureName;
        this.adMdDate = adMdDate;
        this.adRegDate = adRegDate;
        this.uName = uName;
    }
}
