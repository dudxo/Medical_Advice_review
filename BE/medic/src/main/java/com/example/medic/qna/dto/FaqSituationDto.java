package com.example.medic.qna.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import java.util.Date;

@Data
public class FaqSituationDto {

    private Long faqId;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date faqDate;

    private String faqQuestion;

    private String faqAnswer;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date faqMdDate;

    @Builder
    public FaqSituationDto(Long faqId, Date faqDate, String faqQuestion, String faqAnswer, Date faqMdDate){
        this.faqId = faqId;
        this.faqDate = faqDate;
        this.faqQuestion = faqQuestion;
        this.faqAnswer = faqAnswer;
        this.faqMdDate = faqMdDate;
    }
}
