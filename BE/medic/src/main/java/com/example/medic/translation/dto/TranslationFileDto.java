package com.example.medic.translation.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TranslationFileDto {

    private Long tfId;

    private String trMtl;
}
