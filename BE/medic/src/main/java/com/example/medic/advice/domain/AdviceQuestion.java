package com.example.medic.advice.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

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
    private String adAnswerContent;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date adAnswerDate;

    @ManyToOne
    @JoinColumn(name = "adId")
    @JsonIgnore
    private AdviceRequestList adviceRequestList;

    @Builder(toBuilder = true)
    public AdviceQuestion(String adQuestionContent, String adAnswerContent, Date adAnswerDate,
                          AdviceRequestList adviceRequestList, Long adQid) {
        this.adQuestionContent = adQuestionContent;
        this.adAnswerContent = adAnswerContent;
        this.adAnswerDate = adAnswerDate;
        this.adviceRequestList = adviceRequestList;
        this.adQid = adQid;
    }
}
