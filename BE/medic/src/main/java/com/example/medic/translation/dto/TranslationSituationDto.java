package com.example.medic.translation.dto;

import com.example.medic.translation.domain.TranslationRequestList;
import com.example.medic.translation.dto.TranslationSituationDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Builder
public class TranslationSituationDto {

    private String trPtSub;
    private String trPtDiagnosis;
    private LocalDate trRegDate;

    public static TranslationSituationDto from(TranslationRequestList translationRequestList) {
        return TranslationSituationDto.builder()
                .trPtSub(translationRequestList.getTrPtSub())
                .trPtDiagnosis(translationRequestList.getTrPtDiagnosis())
                .trRegDate(translationRequestList.getTrRegDate())
                .build();
    }
}
