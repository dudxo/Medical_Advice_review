package com.example.medic.analyze.domain;

import com.example.medic.advice.domain.AdviceRequestList;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
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
    private String anQuestionContent;

    @NotNull
    private String anAnswerContent;

    private LocalDate anAnswerDate;

    @ManyToOne
    @JoinColumn(name = "anId")
    @JsonIgnore
    private AnalyzeRequestList analyzeRequestList;

    @Builder
    public AnalyzeRequest(Long anQid, String anQuestionContent, String anAnswerContent,
                          LocalDate anAnswerDate, AnalyzeRequestList analyzeRequestList) {
        this.anQid = anQid;
        this.anQuestionContent = anQuestionContent;
        this.anAnswerContent = anAnswerContent;
        this.anAnswerDate = anAnswerDate;
        this.analyzeRequestList = analyzeRequestList;
    }

    @Builder(toBuilder = true)
    public AnalyzeRequest(String anQuestionContent, String anAnswerContent, LocalDate anAnswerDate,
                          AnalyzeRequestList analyzeRequestList, Long anQid) {
        this.anQuestionContent = anQuestionContent;
        this.anAnswerContent = anAnswerContent;
        this.anAnswerDate = anAnswerDate;
        this.analyzeRequestList = analyzeRequestList;
        this.anQid = anQid;
    }

}
