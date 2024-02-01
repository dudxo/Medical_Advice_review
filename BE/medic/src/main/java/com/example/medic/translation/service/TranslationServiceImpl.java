package com.example.medic.translation.service;

import com.example.medic.analyze.domain.AnalyzeRequestList;
import com.example.medic.analyze.dto.AnalyzeRequestFileDto;
import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.client.service.ClientService;
import com.example.medic.files.handler.FileHandler;
import com.example.medic.translation.domain.TranslationAssignment;
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
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.PersistenceException;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TranslationServiceImpl implements TranslationService {

    private final Logger logger = LoggerFactory.getLogger(TranslationServiceImpl.class);
    private final TranslationRequestFileRepository translationRequestFileRepository;
    private final TranslationRequestListRepository translationRequestListRepository;
    private final ClientService clientService;
    private final FileHandler fileHandler;

    /**
     * @return 번역 의뢰 신청 저장
     */
    @Override
    @Transactional
    public boolean saveTranslationRequest(TranslationRequestDto requestDto, ClientInfoDto clientInfoDto, List<MultipartFile> multipartFiles) throws IOException {
        Client currentClient = clientService.findClient(clientInfoDto.getUId());
        TranslationListDto translationListDto = splitRequestToTranslationListDto(requestDto);
        TranslationFileDto translationFileDto = splitRequestToTranslationFileDto(multipartFiles);

        try {
            TranslationRequestList savedTranslationList = saveTranslationList(translationListDto, currentClient);
            saveTranslationFile(savedTranslationList, translationFileDto);

            TranslationAssignment saveedTranslationAssignment = TranslationAssignment.builder()
                    .translationRequestList(savedTranslationList)
                    .build();
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
    public TranslationFileDto splitRequestToTranslationFileDto(List<MultipartFile> multipartFiles) throws IOException {
        if(multipartFiles.size() !=0) {
            Path projectPath = Paths.get(System.getProperty("user.dir") + "/medic/src/main/resources/static/file/translationrequest/");
            List<String> files = fileHandler.parseFile(projectPath, multipartFiles);
            return TranslationFileDto.builder()
                    .trMtl(files.get(0))
                    .build();
        }
        return null;
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

    /**
     * 번역의뢰 수정
     */
    @Transactional
    public boolean updateTranslationRequest(Long trId, TranslationResponseDto updateDto) {
        TranslationRequestList translationRequestList = translationRequestListRepository.findById(trId).orElse(null);

        // 번역의뢰 리스트 수정
        TranslationRequestList updatedTranslationRequestList = translationRequestList.toBuilder()
                .trEtc(updateDto.getTrEtc())
                .trPtName(updateDto.getTrPtName())
                .trPtSub(updateDto.getTrPtSub())
                .trPtSsNum(updateDto.getTrPtSsNum())
                .trPtDiagnosis(updateDto.getTrPtDiagnosis())
                .trPtDiagContent(updateDto.getTrPtDiagContent())
                .build();

        // 수정일자 업데이트
        updatedTranslationRequestList = updatedTranslationRequestList.toBuilder()
                .trMdDate(LocalDate.now())
                .build();

        // 번역의뢰 리스트 저장
        translationRequestListRepository.save(updatedTranslationRequestList);

        return true;
    }
}
