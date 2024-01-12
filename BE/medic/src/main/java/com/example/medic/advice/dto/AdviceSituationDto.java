package com.example.medic.advice.dto;

import com.example.medic.advice.domain.AdviceAssignment;
import com.example.medic.advice.domain.AdviceQuestion;
import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.LoginDto;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Builder
public class AdviceSituationDto {

    private String adPtSub;
    private String adPtDiagnosis;
    private LocalDate adRegDate;

    public static AdviceSituationDto from(AdviceRequestList adviceRequestList) {
        return AdviceSituationDto.builder()
                .adPtSub(adviceRequestList.getAdPtSub())
                .adPtDiagnosis(adviceRequestList.getAdPtDiagnosis())
                .adRegDate(adviceRequestList.getAdRegDate())
                .build();
    }
}