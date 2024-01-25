package com.example.medic.analyze.service;

import com.example.medic.advice.dto.AdviceFileRequestDto;
import com.example.medic.analyze.domain.AnalyzeRequest;
import com.example.medic.analyze.domain.AnalyzeRequestFile;
import com.example.medic.analyze.domain.AnalyzeRequestList;
import com.example.medic.analyze.dto.AnalyzeQuestionDto;
import com.example.medic.analyze.dto.AnalyzeRequestDto;
import com.example.medic.analyze.dto.AnalyzeRequestFileDto;
import com.example.medic.analyze.dto.AnalyzeRequestListDto;
import com.example.medic.analyze.repository.AnalyzeRequestFileRepository;
import com.example.medic.analyze.repository.AnalyzeRequestListRepository;
import com.example.medic.analyze.repository.AnalyzeRequestRepository;
import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.client.service.ClientService;
import com.example.medic.files.handler.FileHandler;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.PersistenceException;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AnalyzeServiceImpl implements AnalyzeService {

    private final Logger logger = LoggerFactory.getLogger(AnalyzeServiceImpl.class);
    private final AnalyzeRequestListRepository analyzeRequestListRepository;
    private final AnalyzeRequestRepository analyzeRequestRepository;
    private final AnalyzeRequestFileRepository analyzeRequestFileRepository;
    private final ClientService clientService;
    private final FileHandler fileHandler;
    /**
     * @return 분석 의뢰 신청 저장
     */
    @Transactional
    public boolean saveAnalyzeRequest(AnalyzeRequestDto requestDto, ClientInfoDto clientInfoDto, List<MultipartFile> multipartFiles) throws IOException {
        Client currentClient = clientService.findClient(clientInfoDto.getUId());
        AnalyzeRequestListDto analyzeRequestListDto = splitRequestToRequestListDto(requestDto);
        AnalyzeQuestionDto analyzeQuestionDtoList = splitRequestToQuestionDto(requestDto);
        AnalyzeRequestFileDto analyzeRequestFileDto = splitRequestToRequestFileDto(multipartFiles);

        try{
            AnalyzeRequestList savedAnalyzeRequestList = saveAnalyzeRequestList(analyzeRequestListDto, currentClient);
            saveAnalyzeQuestion(savedAnalyzeRequestList, analyzeQuestionDtoList);
            saveAnalyzeFile(savedAnalyzeRequestList, analyzeRequestFileDto);
            return true;
        } catch (PersistenceException p){
            logger.info("분석 의뢰 신청 저장 실패");
            return false;
        }
    }

    /**
     * @return 요청 받은 분석 의뢰지 변환
     */
    public AnalyzeRequestListDto splitRequestToRequestListDto(AnalyzeRequestDto analyzeRequestDto) {
        return AnalyzeRequestListDto.builder()
                .anPtName(analyzeRequestDto.getAnPtName())
                .anPtSsNum(analyzeRequestDto.getAnPtSsNum())
                .anPtSub(analyzeRequestDto.getAnPtSub())
                .anPtDiagnosis(analyzeRequestDto.getAnDiagnosis())
                .anPtDiagContent(analyzeRequestDto.getAnPtDiagContent())
                .anEtc(analyzeRequestDto.getAnEtc())
                .build();
    }

    /**
     * @return 요청 받은 분석 의뢰 질문지 변환
     */
    public AnalyzeQuestionDto splitRequestToQuestionDto(AnalyzeRequestDto analyzeRequestDto) {
        return AnalyzeQuestionDto.builder()
                .anQuestionContent(analyzeRequestDto.getAnQuestionContent())
                .build();

    }

    /**
     * @return 요청 받은 분석 의뢰 파일 변환
     */
    public AnalyzeRequestFileDto splitRequestToRequestFileDto(List<MultipartFile> multipartFiles) throws IOException {
        if(multipartFiles.size() !=0) {
            Path projectPath = Paths.get(System.getProperty("user.dir") + "/medic/src/main/resources/static/file/advicerequest/");
            List<String> files = fileHandler.parseFile(projectPath, multipartFiles);
            return AnalyzeRequestFileDto.builder()
                    .anReqForm(files.get(0))
                    .anDiagnosis(files.get(1))
                    .anRecord(files.get(2))
                    .anFilm(files.get(3))
                    .anOther(files.get(4))
                    .build();
        }
        return null;
    }


    /**
     * @return 분석 의뢰 리스트 내용 저장
     * @throws PersistenceException
     */
    @Transactional
    public AnalyzeRequestList saveAnalyzeRequestList(AnalyzeRequestListDto analyzeRequestListDto,
                                                     Client client) throws PersistenceException {
        try {
            AnalyzeRequestList analyzeRequestList = AnalyzeRequestList.builder()
                    .anPtName(analyzeRequestListDto.getAnPtName())
                    .anPtSsNum(analyzeRequestListDto.getAnPtSsNum())
                    .anPtSub(analyzeRequestListDto.getAnPtSub())
                    .anPtDiagnosis(analyzeRequestListDto.getAnPtDiagnosis())
                    .anPtDiagContent(analyzeRequestListDto.getAnPtDiagContent())
                    .anEtc(analyzeRequestListDto.getAnEtc())
                    .anRegDate(LocalDate.now())
                    .build();

            return analyzeRequestListRepository.save(analyzeRequestList);
        } catch (PersistenceException e) {
            logger.info("분석 의뢰 내역 저장 실패");
            throw new PersistenceException();
        }
    }

    /**
     * 분석 의뢰 질문지 저장
     * @throws PersistenceException
     */
    @Transactional
    public void saveAnalyzeQuestion(AnalyzeRequestList savedAnalyzeRequestList,
                                    AnalyzeQuestionDto analyzeQuestionDto) throws PersistenceException {
        try {
            for (String questionContent : analyzeQuestionDto.getAnQuestionContent()) {
                AnalyzeRequest analyzeRequest = AnalyzeRequest.builder()
                        .anQuestionContent(questionContent)
                        .analyzeRequestList(savedAnalyzeRequestList)
                        .build();
                analyzeRequestRepository.save(analyzeRequest);
            }
        } catch (PersistenceException e) {
            logger.info("분석 의뢰 질문지 저장 실패");
            throw new PersistenceException();
        }
    }

    /**
     * 분석 의뢰 파일 저장
     * @throws PersistenceException
     */
    @Transactional
    public void saveAnalyzeFile(AnalyzeRequestList savedAnalyzeRequestList,
                                AnalyzeRequestFileDto analyzeRequestFileDto) throws PersistenceException {
        try {
            AnalyzeRequestFile analyzeRequestFile = AnalyzeRequestFile.builder()
                    .anReqForm(analyzeRequestFileDto.getAnReqForm())
                    .anDiagnosis(analyzeRequestFileDto.getAnDiagnosis())
                    .anRecord(analyzeRequestFileDto.getAnRecord())
                    .anFilm(analyzeRequestFileDto.getAnFilm())
                    .anOther(analyzeRequestFileDto.getAnOther())
                    .analyzeRequestList(savedAnalyzeRequestList)
                    .build();
            analyzeRequestFileRepository.save(analyzeRequestFile);
        } catch (PersistenceException e) {
            logger.info("분석 의뢰 파일 저장 실패");
            throw new PersistenceException();
        }
    }
}