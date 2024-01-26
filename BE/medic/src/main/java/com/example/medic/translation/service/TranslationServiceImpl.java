package com.example.medic.translation.service;

import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.client.service.ClientService;
import com.example.medic.translation.domain.TranslationRequestFile;
import com.example.medic.translation.domain.TranslationRequestList;
import com.example.medic.translation.dto.TranslationFileDto;
import com.example.medic.translation.dto.TranslationListDto;
import com.example.medic.translation.dto.TranslationRequestDto;
import com.example.medic.translation.dto.TranslationResponseDto;
import com.example.medic.translation.repository.TranslationRequestFileRepository;
import com.example.medic.translation.repository.TranslationRequestListRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.PersistenceException;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class TranslationServiceImpl implements TranslationService {

    private final Logger logger = LoggerFactory.getLogger(TranslationServiceImpl.class);
    private final TranslationRequestFileRepository translationRequestFileRepository;
    private final TranslationRequestListRepository translationRequestListRepository;
    private final ClientService clientService;

    /**
     * @return 번역 의뢰 신청 저장
     */
    @Override
    @Transactional
    public boolean saveTranslationRequest(TranslationRequestDto requestDto, ClientInfoDto clientInfoDto) {
        Client currentClient = clientService.findClient(clientInfoDto.getUId());
        TranslationListDto translationListDto = splitRequestToTranslationListDto(requestDto);
        TranslationFileDto translationFileDto = splitRequestToTranslationFileDto(requestDto);

        try {
            TranslationRequestList savedTranslationList = saveTranslationList(translationListDto, currentClient);
            saveTranslationFile(savedTranslationList, translationFileDto);
            return true;
        } catch (PersistenceException e) {
            logger.info("번역 의뢰 신청 저장중 이상 오류로 인한 실패");
            return false;
        }
    }

    /**
     * @return 요청 받은 번역 의뢰 파일 변환
     */
    @Override
    public TranslationFileDto splitRequestToTranslationFileDto(TranslationRequestDto request) {
        return TranslationFileDto.builder()
                .trMtl(request.getTrMtl())
                .build();
    }

    /**
     * @return 요청 받은 번역 의뢰 내용 변환
     */
    @Override
    public TranslationListDto splitRequestToTranslationListDto(TranslationRequestDto request) {
        return TranslationListDto.builder()
                .trPtName(request.getTrPtName())
                .trPtSsNum(request.getTrPtSsNum())
                .trPtSub(request.getTrPtSub())
                .trPtDiagnosis(request.getTrPtDiagnosis())
                .trPtDiagContent(request.getTrPtDiagContent())
                .trEtc(request.getTrEtc())
                .build();
    }

    /**
     * @return 요청 받은 번역 의뢰 내용 저장
     */
    @Override
    @Transactional
    public TranslationRequestList saveTranslationList(TranslationListDto translationListDto,
                                                      Client client) throws PersistenceException {
        try {
            TranslationRequestList translationRequestList = TranslationRequestList.builder()
                    .trPtName(translationListDto.getTrPtName())
                    .trPtSsNum(translationListDto.getTrPtSsNum())
                    .trPtSub(translationListDto.getTrPtSub())
                    .trPtDiagnosis(translationListDto.getTrPtDiagnosis())
                    .trPtDiagContent(translationListDto.getTrPtDiagContent())
                    .trEtc(translationListDto.getTrEtc())
                    .trRegDate(LocalDate.now())
                    .client(client)
                    .build();
            return translationRequestListRepository.save(translationRequestList);
        } catch (PersistenceException e) {
            logger.info("번역 의뢰 내역 저장 실패");
            throw new PersistenceException();
        }
    }

    /**
     * 요청 받은 번역 의뢰 파일 저장
     */
    @Override
    @Transactional
    public void saveTranslationFile(TranslationRequestList savedTranslationRequestList,
                                    TranslationFileDto translationFileDto) throws PersistenceException {
        try {
            TranslationRequestFile translationRequestFile = TranslationRequestFile.builder()
                    .trMtl(translationFileDto.getTrMtl())
                    .translationRequestList(savedTranslationRequestList)
                    .build();
            translationRequestFileRepository.save(translationRequestFile);
        } catch (PersistenceException e) {
            logger.info("번역 의뢰 파일 저장 실패");
            throw new PersistenceException();
        }

    }

    /**
     * 번역의뢰 상세 조회
     */
    public TranslationResponseDto getTranslationDetail(Long trId) {
        TranslationRequestList translationRequestList = translationRequestListRepository.findById(trId).get();

        TranslationResponseDto translationResponseDto = TranslationResponseDto.builder()
                .trId(translationRequestList.getTrId())
                .trPtName(translationRequestList.getTrPtName())
                .trPtSsNum(translationRequestList.getTrPtSsNum())
                .trPtSub(translationRequestList.getTrPtSub())
                .trPtDiagnosis(translationRequestList.getTrPtDiagnosis())
                .trPtDiagContent(translationRequestList.getTrPtDiagContent())
                .trEtc(translationRequestList.getTrEtc())
                .build();

        return translationResponseDto;
    }
}
