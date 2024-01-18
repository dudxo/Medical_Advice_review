package com.example.medic.consultative.domain;

import com.example.medic.advice.domain.AdviceAssignment;
import com.example.medic.advice.domain.AdviceQuestion;
import com.example.medic.analyze.domain.AnalyzeAssignment;
import com.example.medic.translation.domain.TranslationAnswerFile;
import com.example.medic.translation.domain.TranslationAssignment;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor

public class Consultative {

    @Id
    @NotNull
    private String cId;

    @NotNull
    private String cPw;

    @NotNull
    private String cRole;

    @NotNull
    private String cName;

    @NotNull
    private String cEmail;

    private String cTel;

    @NotNull
    private String cPhone;

    @NotNull
    private String cAddress;

    @NotNull
    private String hospName;

    @NotNull
    private String hospTel;

    @NotNull
    private String department;

    private String hospFx;

    @NotNull
    private String hospNum;
    @NotNull
    private String hospAddress;

    @OneToMany(mappedBy = "consultative")
    private List<AdviceAssignment> adviceAssignments = new ArrayList<>();

    @OneToMany(mappedBy = "consultative")
    private List<AnalyzeAssignment> analyzeAssignments = new ArrayList<>();

    @OneToMany(mappedBy = "consultative")
    private List<TranslationAssignment> translationAssignments = new ArrayList<>();

    @OneToMany(mappedBy = "consultative")
    private List<TranslationAnswerFile> translationAnswerFiles = new ArrayList<>();
}
