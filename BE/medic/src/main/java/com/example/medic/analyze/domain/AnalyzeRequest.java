package com.example.medic.analyze.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor
public class AnalyzeRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long anQid;

    @NotNull
    private int anQuestionNum;

    @NotNull
    private String anQuestionContent;

    @NotNull
    private String anAnswerContent;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date anAnswerDate;

    @ManyToOne
    @JoinColumn(name = "anId")
    @JsonIgnore
    private AnalyzeRequestList analyzeRequestList;



}
