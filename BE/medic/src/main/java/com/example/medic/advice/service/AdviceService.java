package com.example.medic.advice.service;

import com.example.medic.advice.domain.AdviceFile;
import com.example.medic.advice.domain.AdviceQuestion;
import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.advice.domain.DiagnosisRecord;
import com.example.medic.advice.dto.*;
import com.example.medic.advice.repository.*;
import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.client.service.ClientService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import javax.persistence.PersistenceException;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class AdviceService {

    private final Logger logger = LoggerFactory.getLogger(AdviceService.class);
    private final AdviceAssignmentRepository adviceAssignmentRepository;
    private final AdviceFileRepository adviceFileRepository;
    private final AdviceQuestionRepository adviceQuestionRepository;
    private final AdviceRequestListRepository adviceRequestListRepository;
    private final DiagnosisRecordRepository diagnosisRecordRepository;

    private final ClientService clientService;

    public boolean saveAdviceRequest(AllAdviceRequestDto allAdviceRequestDto, ClientInfoDto clientInfoDto) {
        Client client = clientService.findClient(clientInfoDto.getUId());
        AdviceFileRequestDto parseAdviceFileRequestDto = parseAdviceFileDto(allAdviceRequestDto);
        AdviceQuestionRequestDto parseAdviceQuestionRequestDto = parseAdviceQuestionRequestDto(allAdviceRequestDto);
        AdviceRequestListDto parseAdviceRequestListDto = parseAdviceRequestListDto(allAdviceRequestDto);
        DiagnosisRecordRequestDto parseDiagnosisRecordRequestDto = parseDiagnosisRecordRequestDto(allAdviceRequestDto);

        try{
            AdviceRequestList adviceRequestList = saveAdviceRequestList(parseAdviceRequestListDto, client);
            saveAdviceFileRequest(parseAdviceFileRequestDto, adviceRequestList);
            saveAdviceQuestionRequest(parseAdviceQuestionRequestDto, adviceRequestList);
            saveDiagnosisRecordRequest(parseDiagnosisRecordRequestDto, adviceRequestList);
            return true;
        }catch (PersistenceException p){
            logger.info("자문 의뢰 신청 저장 실패");
            return false;
        }
    }

    public AdviceFileRequestDto parseAdviceFileDto(AllAdviceRequestDto allAdviceRequestDto) {
        return AdviceFileRequestDto.builder()
                .adReqForm(allAdviceRequestDto.getAdReqForm())
                .adDiagnosis(allAdviceRequestDto.getAdDiagnosis())
                .adRecord(allAdviceRequestDto.getAdRecord())
                .adFilm(allAdviceRequestDto.getAdFilm())
                .adOther(allAdviceRequestDto.getAdOther())
                .build();
    }

    public AdviceQuestionRequestDto parseAdviceQuestionRequestDto(AllAdviceRequestDto allAdviceRequestDto) {
        return AdviceQuestionRequestDto.builder()
                .adQuestionContent(allAdviceRequestDto.getAdQuestionContent())
                .adAnswerContent(allAdviceRequestDto.getAdAnswerContent())
                .adAnswerDate(allAdviceRequestDto.getAdAnswerDate())
                .build();
    }
    public AdviceRequestListDto parseAdviceRequestListDto(AllAdviceRequestDto allAdviceRequestDto) {
        return AdviceRequestListDto.builder()
                .adPtName(allAdviceRequestDto.getAdPtName())
                .adPtSsNum(allAdviceRequestDto.getAdPtSsNum())
                .adPtSub(allAdviceRequestDto.getAdPtSub())
                .adPtDiagnosis(allAdviceRequestDto.getAdPtDiagnosis())
                .adPtRec(allAdviceRequestDto.getAdPtRec())
                .adPtCmt(allAdviceRequestDto.getAdPtCmt())
                .insurance(allAdviceRequestDto.getInsurance())
                .insureDate(allAdviceRequestDto.getInsureDate())
                .insureName(allAdviceRequestDto.getInsureName())
                .insureName(allAdviceRequestDto.getInsureName())
                .adEtc(allAdviceRequestDto.getAdEtc())
                .adRegDate(allAdviceRequestDto.getAdRegDate())
                .adMdDate(allAdviceRequestDto.getAdMdDate())
                .build();
    }

    public DiagnosisRecordRequestDto parseDiagnosisRecordRequestDto(AllAdviceRequestDto allAdviceRequestDto) {
        return DiagnosisRecordRequestDto.builder()
                .hospital(allAdviceRequestDto.getHospital())
                .admStart(allAdviceRequestDto.getAdmStart())
                .admEnd(allAdviceRequestDto.getAdmEnd())
                .visitStart(allAdviceRequestDto.getVisitStart())
                .visitEnd(allAdviceRequestDto.getVisitEnd())
                .treatCmt(allAdviceRequestDto.getTreatCmt())
                .diagRound(allAdviceRequestDto.getDiagRound())
                .build();
    }

    public AdviceRequestList saveAdviceRequestList(AdviceRequestListDto parseAdviceRequestListDto,
                                                   Client client) throws PersistenceException {
        try {
            AdviceRequestList adviceRequestList = AdviceRequestList.builder()
                    .adPtName(parseAdviceRequestListDto.getAdPtName())
                    .adPtCmt(parseAdviceRequestListDto.getAdPtCmt())
                    .adPtSsNum(parseAdviceRequestListDto.getAdPtSsNum())
                    .adPtSub(parseAdviceRequestListDto.getAdPtSub())
                    .adPtDiagnosis(parseAdviceRequestListDto.getAdPtDiagnosis())
                    .adPtRec(parseAdviceRequestListDto.getAdPtRec())
                    .adEtc(parseAdviceRequestListDto.getAdEtc())
                    .insurance(parseAdviceRequestListDto.getInsurance())
                    .insureDate(parseAdviceRequestListDto.getInsureDate())
                    .insureName(parseAdviceRequestListDto.getInsureName())
                    .adMdDate(parseAdviceRequestListDto.getAdMdDate())
                    .adRegDate(parseAdviceRequestListDto.getAdRegDate())
                    .client(client)
                    .build();
            adviceRequestListRepository.save(adviceRequestList);
            return adviceRequestList;
        }catch (PersistenceException p){
            logger.info("자문 의뢰 내역 저장 실패");
            throw new PersistenceException();
        }
    }

    public boolean saveAdviceQuestionRequest(AdviceQuestionRequestDto parseAdviceQuestionRequestDto,
                                          AdviceRequestList adviceRequestList) throws PersistenceException {
        try {
            AdviceQuestion adviceQuestionRequest = AdviceQuestion.builder()
                    .adQuestionContent(parseAdviceQuestionRequestDto.getAdQuestionContent())
                    .adAnswerContent(parseAdviceQuestionRequestDto.getAdAnswerContent())
                    .adAnswerDate(parseAdviceQuestionRequestDto.getAdAnswerDate())
                    .adviceRequestList(adviceRequestList)
                    .build();
            adviceQuestionRepository.save(adviceQuestionRequest);
            return true;
        }catch (PersistenceException p){
            logger.info("자문 내역질 문지 저장 실패");
            throw new PersistenceException();
        }
    }

    public boolean saveAdviceFileRequest(AdviceFileRequestDto parseAdviceFileRequestDto,
                                         AdviceRequestList adviceRequestList) throws PersistenceException {
        try {
            AdviceFile adviceFile = AdviceFile.builder()
                    .adReqForm(parseAdviceFileRequestDto.getAdReqForm())
                    .adDiagnosis(parseAdviceFileRequestDto.getAdDiagnosis())
                    .adRecord(parseAdviceFileRequestDto.getAdRecord())
                    .adFilm(parseAdviceFileRequestDto.getAdFilm())
                    .adOther(parseAdviceFileRequestDto.getAdOther())
                    .adviceRequestList(adviceRequestList)
                    .build();
            adviceFileRepository.save(adviceFile);
            return true;
        }catch (PersistenceException p){
            logger.info("자문 파일 저장 실패");
            throw new PersistenceException();
        }
    }

    public boolean saveDiagnosisRecordRequest(DiagnosisRecordRequestDto parseDiagnosisRecordRequestDto,
                                              AdviceRequestList adviceRequestList) throws PersistenceException {
        try{
            DiagnosisRecord diagnosisRecord = DiagnosisRecord.builder()
                    .hospital(parseDiagnosisRecordRequestDto.getHospital())
                    .admStart(parseDiagnosisRecordRequestDto.getAdmStart())
                    .admEnd(parseDiagnosisRecordRequestDto.getAdmEnd())
                    .visitStart(parseDiagnosisRecordRequestDto.getVisitStart())
                    .visitEnd(parseDiagnosisRecordRequestDto.getVisitEnd())
                    .treatCmt(parseDiagnosisRecordRequestDto.getTreatCmt())
                    .diagRound(parseDiagnosisRecordRequestDto.getDiagRound())
                    .adviceRequestList(adviceRequestList)
                    .build();
            diagnosisRecordRepository.save(diagnosisRecord);
            return true;
        }catch (PersistenceException p){
            logger.info("진료 기록 저장 실패");
            throw new PersistenceException();
        }
    }
}
