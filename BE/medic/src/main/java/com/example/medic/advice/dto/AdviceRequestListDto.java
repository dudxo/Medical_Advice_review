package com.example.medic.advice.dto;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Builder
public class AdviceRequestListDto {
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

    @Builder
    public AdviceRequestListDto(String adPtName, String adPtSsNum, String adPtSub, String adPtDiagnosis,
                                String adPtRec, String adPtCmt, String insurance, String insureDate,
                                String insureName, String adEtc, Date adRegDate, Date adMdDate) {
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
    }
}
