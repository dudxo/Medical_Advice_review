package com.example.medic.analyze.domain;

import com.example.medic.advice.domain.AdviceAssignment;
import com.example.medic.advice.domain.AdviceQuestion;
import com.example.medic.client.domain.Client;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
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

public class AnalyzeRequestList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long anId;

    @NotNull
    private String anPtName;

    @NotNull
    private String anPtSsNum;

    @NotNull
    private String ptSub;
    @NotNull
    private String anPtDiagnosis;

    @NotNull
    private String anPtDiagContent;

    @NotNull
    private String anEtc;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date adRegDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date adMdDate;

    @ManyToOne
    @JoinColumn(name = "client_Id")
    @JsonIgnore
    private Client client;

    @OneToOne(mappedBy = "analyzeRequestList")
    private AnalyzeAssignment analyzeAssignment;

    @OneToMany(mappedBy = "analyzeRequestList")
    private List<AnalyzeRequest> analyzeRequests = new ArrayList<>();

    @OneToMany(mappedBy = "analyzeRequestList")
    private List<AnalyzeRequestFile> analyzeRequestFiles = new ArrayList<>();


}
