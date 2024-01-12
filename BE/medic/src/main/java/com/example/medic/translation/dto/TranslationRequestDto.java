package com.example.medic.translation.dto;

import com.example.medic.consultative.domain.Consultative;
import com.example.medic.translation.domain.TranslationRequestList;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import java.time.LocalDate;
import java.util.Date;

@Getter
@Builder
public class TranslationRequestDto {

    private Long trId;

    private String trPtName;

    private String trPtSsNum;

    private String trPtSub;

    private String trPtDiagnosis;

    private String trPtDiagContent;

    private String trEtc;

    private LocalDate trRegDate;

    private LocalDate trMdDate;

    private String trMtl;       // 번역 의뢰 내역 파일
}
