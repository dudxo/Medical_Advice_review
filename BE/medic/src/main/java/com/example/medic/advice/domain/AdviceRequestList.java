package com.example.medic.advice.domain;

import com.example.medic.client.domain.Client;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class AdviceRequestList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long adId;

    @NotNull
    private String adPtName;

    @NotNull
    private String adPtSsNum;

    @NotNull
    private String adPtSub;

    @NotNull
    private String adPtDiagnosis;

    private String adPtRec;

    @NotNull
    private String adPtCmt;

    private String insurance;

    private String insureDate;

    private String insureName;

    private String adEtc;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date adRegDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date adMdDate;

    @ManyToOne
    @JoinColumn(name = "client_Id")
    @JsonIgnore
    private Client client;

    @OneToMany(mappedBy = "adviceRequestList")
    private List<DiagnosisRecord> diagnosisRecords = new ArrayList<>();

    @OneToMany(mappedBy = "adviceRequestList")
    private List<AdviceFile> AdviceFiles = new ArrayList<>();

    @OneToMany(mappedBy = "adviceRequestList")
    private List<AdviceQuestion> AdviceQuestions = new ArrayList<>();


    @OneToOne(mappedBy = "adviceRequestList")
    @JsonIgnore
    private AdviceAssignment adviceAssignment;

    @Builder
    private AdviceRequestList(Long adId, String adPtName, String adPtSsNum, String adPtSub, String adPtDiagnosis,
                              String adPtRec, String adPtCmt, String insurance, String insureDate, String insureName,
                              String adEtc, Date adMdDate, Date adRegDate, Client client,AdviceAssignment adviceAssignment){
        this.adId = adId;
        this.adPtName = adPtName;
        this.adPtCmt = adPtCmt;
        this.adPtSsNum = adPtSsNum;
        this.adPtSub = adPtSub;
        this.adPtDiagnosis = adPtDiagnosis;
        this.adPtRec = adPtRec;
        this.adEtc = adEtc;
        this.insurance =insurance;
        this.insureDate = insureDate;
        this.insureName = insureName;
        this.adMdDate = adMdDate;
        this.adRegDate = adRegDate;
        this.client = client;
        this.adviceAssignment = adviceAssignment;
    }
}
