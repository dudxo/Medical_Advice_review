package com.example.medic.analyze.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class AnalyzeRequestFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long anfId;

    private String anReqForm;

    private String anDiagnosis;

    private String anRecord;

    private String anFilm;

    private String anOther;

    @ManyToOne
    @JoinColumn(name = "anId")
    @JsonIgnore
    private AnalyzeRequestList analyzeRequestList;
}
