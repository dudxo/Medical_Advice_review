package com.example.medic.analyze.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

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

    private String anAnswerContent;

    private LocalDate anAnswerDate;

    @ManyToOne
    @JoinColumn(name = "anId")
    @JsonIgnore
    private AnalyzeRequestList analyzeRequestList;

    @Builder
    public AnalyzeRequest(Long anQid, int anQuestionNum, String anQuestionContent, String anAnswerContent,
                          LocalDate anAnswerDate, AnalyzeRequestList analyzeRequestList) {
        this.anQid = anQid;
        this.anQuestionNum = anQuestionNum;
        this.anQuestionContent = anQuestionContent;
        this.anAnswerContent = anAnswerContent;
        this.anAnswerDate = anAnswerDate;
        this.analyzeRequestList = analyzeRequestList;
    }
}
