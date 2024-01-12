package com.example.medic.translation.service;

import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.translation.domain.TranslationRequestList;
import com.example.medic.translation.dto.TranslationFileDto;
import com.example.medic.translation.dto.TranslationRequestDto;
import com.example.medic.translation.dto.TranslationListDto;

public interface TranslationService {

    boolean saveTranslationRequest(TranslationRequestDto requestDto, ClientInfoDto clientInfoDto);

    TranslationFileDto splitRequestToTranslationFileDto(TranslationRequestDto request);

    TranslationListDto splitRequestToTranslationListDto(TranslationRequestDto request);

    TranslationRequestList saveTranslationList(TranslationListDto translationListDto, Client client);

    void saveTranslationFile(TranslationRequestList translationRequestList, TranslationFileDto translationFileDto);
}
