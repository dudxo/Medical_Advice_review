package com.example.medic.advice.dto;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Getter
@Builder
public class AdviceQuestionRequestDto {

    private List<String> adQuestionContent;

    private String adAnswerContent;

    private LocalDate adAnswerDate;

    public AdviceQuestionRequestDto(List<String> adQuestionContent, String adAnswerContent, LocalDate adAnswerDate) {
        this.adQuestionContent = adQuestionContent;
        this.adAnswerContent = adAnswerContent;
        this.adAnswerDate = adAnswerDate;
    }
}
