package com.example.medic.qna.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;

@Data
public class FaqSituationDto {

    private Long faqId;


    private LocalDate faqDate;

    private String faqQuestion;

    private String faqAnswer;

    private LocalDate faqMdDate;

    private LocalDate faqRegDate;

    @Builder
    public FaqSituationDto(Long faqId, LocalDate faqDate, String faqQuestion, String faqAnswer, LocalDate faqMdDate, LocalDate faqRegDate){
        this.faqId = faqId;
        this.faqDate = faqDate;
        this.faqQuestion = faqQuestion;
        this.faqAnswer = faqAnswer;
        this.faqMdDate = faqMdDate;
        this.faqRegDate = faqRegDate;
    }
}
