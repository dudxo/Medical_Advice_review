package com.example.medic.analyze.dto;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
public class AnalyzeQuestionDto {

    private Long anQid;

    private List<String> anQuestionContent;

    private String anAnswerContent;

    private LocalDate anAnswerDate;

}
