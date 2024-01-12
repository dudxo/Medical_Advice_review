package com.example.medic.analyze.service;

import com.example.medic.advice.service.AdviceService;
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
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.PersistenceException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AnalyzeService {

    private final Logger logger = LoggerFactory.getLogger(AnalyzeService.class);
    private final AnalyzeRequestListRepository analyzeRequestListRepository;
    private final AnalyzeRequestRepository analyzeRequestRepository;
    private final AnalyzeRequestFileRepository analyzeRequestFileRepository;
    private final ClientService clientService;

    /**
     * @return 분석 의뢰 신청 저장
     */
    @Transactional
    public boolean saveAnalyzeRequest(AnalyzeRequestDto requestDto, ClientInfoDto clientInfoDto) {
        Client currentClient = clientService.findClient(clientInfoDto.getUId());
        AnalyzeRequestListDto analyzeRequestListDto = splitRequestToRequestListDto(requestDto);
        List<AnalyzeQuestionDto> analyzeQuestionDtoList = splitRequestToQuestionDto(requestDto);
        AnalyzeRequestFileDto analyzeRequestFileDto = splitRequestToRequestFileDto(requestDto);

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
    public List<AnalyzeQuestionDto> splitRequestToQuestionDto(AnalyzeRequestDto analyzeRequestDto) {
        List<AnalyzeQuestionDto> analyzeQuestionDtoList = new ArrayList<>();
        Map<String, String> questions = analyzeRequestDto.getQuestions();
        questions.forEach((key, value) ->
                analyzeQuestionDtoList.add(
                        AnalyzeQuestionDto.builder()
                                .anQuestionNum(Integer.parseInt(key))
                                .anAnswerContent(value).build()));
        return analyzeQuestionDtoList;
    }

    /**
     * @return 요청 받은 분석 의뢰 파일 변환
     */
    public AnalyzeRequestFileDto splitRequestToRequestFileDto(AnalyzeRequestDto analyzeRequestDto) {
        return AnalyzeRequestFileDto.builder()
                .anReqForm(analyzeRequestDto.getAnReqForm())
                .anDiagnosis(analyzeRequestDto.getAnDiagnosis())
                .anRecord(analyzeRequestDto.getAnRecord())
                .anFilm(analyzeRequestDto.getAnFilm())
                .anOther(analyzeRequestDto.getAnOther())
                .build();
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
                                    List<AnalyzeQuestionDto> analyzeQuestionDtoList) throws PersistenceException {
        try {
            for (AnalyzeQuestionDto analyzeQuestionDto : analyzeQuestionDtoList) {
                AnalyzeRequest analyzeRequest = AnalyzeRequest.builder()
                        .anQuestionNum(analyzeQuestionDto.getAnQuestionNum())
                        .anQuestionContent(analyzeQuestionDto.getAnQuestionContent())
                        .anAnswerContent(analyzeQuestionDto.getAnAnswerContent())
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
