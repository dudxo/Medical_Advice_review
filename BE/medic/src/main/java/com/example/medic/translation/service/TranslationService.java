package com.example.medic.translation.service;

import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.translation.domain.TranslationRequestList;
import com.example.medic.translation.dto.TranslationFileDto;
import com.example.medic.translation.dto.TranslationRequestDto;
import com.example.medic.translation.dto.TranslationListDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface TranslationService {

    boolean saveTranslationRequest(TranslationRequestDto requestDto, ClientInfoDto clientInfoDto, List<MultipartFile> multipartFiles) throws IOException;

    TranslationFileDto splitRequestToTranslationFileDto(List<MultipartFile> multipartFiles) throws IOException;

    TranslationListDto splitRequestToTranslationListDto(TranslationRequestDto request);

    TranslationRequestList saveTranslationList(TranslationListDto translationListDto, Client client);

    void saveTranslationFile(TranslationRequestList translationRequestList, TranslationFileDto translationFileDto);
}
