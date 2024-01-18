package com.example.medic.manager.dto;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class TrDetailDto {
    private String trPtName;

    private String trPtSsNum;

    private String trPtSub;

    private String trPtDiagnosis;

    private String trPtDiagContent;

    private String trEtc;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date trRegDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date trMdDate;

    private String uId;
    private String uName;
    private String userAddress;
    private String userPhone;
    private String userTel;

@Builder
    public TrDetailDto(String trPtName , String trPtSsNum, String trPtSub, String trEtc, Date trMdDate,String trPtDiagnosis,
                      String uId, String uName, String userAddress, String userPhone, String userTel ,String trPtDiagContent){
    this.trPtName = trPtName;
    this.trEtc = trEtc;
    this.trMdDate = trMdDate;
    this.trPtDiagContent= trPtDiagContent;
    this.trPtDiagnosis = trPtDiagnosis;
    this.trPtSsNum = trPtSsNum;
    this.trPtSub = trPtSub;
    this.uId = uId;
    this.uName = uName;
    this.userAddress = userAddress;
    this.userPhone = userPhone;
    this.userTel = userTel;

    }
}
