package com.example.medic.advice.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
public class AdviceQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long adQid;

    @NotNull
    private String adQuestionContent;

    @NotNull
    private int adQuestionNum;

    @NotNull
    private String adAnswerContent;

    private LocalDate adAnswerDate;

    @ManyToOne
    @JoinColumn(name = "adId")
    @JsonIgnore
    private AdviceRequestList adviceRequestList;

    @Builder
    public AdviceQuestion(String adQuestionContent, String adAnswerContent, LocalDate adAnswerDate,
                          int adQuestionNum, AdviceRequestList adviceRequestList) {
        this.adQuestionContent = adQuestionContent;
        this.adAnswerContent = adAnswerContent;
        this.adAnswerDate = adAnswerDate;
        this.adQuestionNum = adQuestionNum;
        this.adviceRequestList = adviceRequestList;
    }
}
