package com.example.medic.analyze.dto;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Builder
public class AnalyzeQuestionDto {

    private Long anQid;

    private int anQuestionNum;

    private String anQuestionContent;

    private String anAnswerContent;

    private Date anAnswerDate;

}
