package com.example.medic.advice.service;

import com.example.medic.advice.domain.*;
import com.example.medic.advice.dto.*;
import com.example.medic.advice.repository.*;
import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.client.service.ClientService;
import com.example.medic.manager.dto.AdDetailDto;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceException;
import java.util.*;

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

    /**
     * @return 자문 의뢰 신청 저장
     */
    @Transactional
    public boolean saveAdviceRequest(AllAdviceRequestDto allAdviceRequestDto, ClientInfoDto clientInfoDto) {
        Client client = clientService.findClient(clientInfoDto.getUId());
        AdviceFileRequestDto parseAdviceFileRequestDto = splitRequestToFileDto(allAdviceRequestDto);
        AdviceQuestionRequestDto parseAdviceQuestionRequestDto = splitRequestToQuestionDto(allAdviceRequestDto);
        AdviceRequestListDto parseAdviceRequestListDto = splitRequestToRequestListDto(allAdviceRequestDto);
        DiagnosisRecordRequestDto parseDiagnosisRecordRequestDto = parseDiagnosisRecordRequestDto(allAdviceRequestDto);

        try {

            AdviceRequestList savedAdviceRequestList = saveAdviceRequestList(parseAdviceRequestListDto, client);
            saveAdviceFile(parseAdviceFileRequestDto, savedAdviceRequestList);
            saveAdviceQuestion(parseAdviceQuestionRequestDto, savedAdviceRequestList);
            saveAdviceDiagnosisRecord(parseDiagnosisRecordRequestDto, savedAdviceRequestList);

            AdviceAssignment adviceAssignment = AdviceAssignment.builder()
                    .adviceRequestList(savedAdviceRequestList)
                    .build();
            adviceAssignmentRepository.save(adviceAssignment);

            return true;
        } catch (PersistenceException p) {
            logger.info("자문 의뢰 신청 저장 실패");
            return false;
        }
    }


    /**
     * @return 자문 의뢰 신청 파일 변환
     */
    public AdviceFileRequestDto splitRequestToFileDto(AllAdviceRequestDto allAdviceRequestDto) {
        return AdviceFileRequestDto.builder()
                .adReqForm(allAdviceRequestDto.getAdReqForm())
                .adDiagnosis(allAdviceRequestDto.getAdDiagnosis())
                .adRecord(allAdviceRequestDto.getAdRecord())
                .adFilm(allAdviceRequestDto.getAdFilm())
                .adOther(allAdviceRequestDto.getAdOther())
                .build();
    }

    /**
     * @return 자문 의뢰 신청 질문지 변환
     */
    public AdviceQuestionRequestDto splitRequestToQuestionDto(AllAdviceRequestDto allAdviceRequestDto) {
        return AdviceQuestionRequestDto.builder()
                .adQuestionContent(allAdviceRequestDto.getAdQuestionContent())
                .build();
    }

    /**
     * @return 자문 의뢰 신청 내역 변환
     */
    public AdviceRequestListDto splitRequestToRequestListDto(AllAdviceRequestDto allAdviceRequestDto) {
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

    /**
     * @return 자문 의뢰 신청 진료기록 변환
     */
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


    /**
     * @return 자문 의뢰 신청 내역 저장
     */
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
        } catch (PersistenceException p) {
            logger.info("자문 의뢰 내역 저장 실패");
            throw new PersistenceException();
        }
    }

    /**
     * 자문 의뢰 신청 질문 저장
     */
    public void saveAdviceQuestion(AdviceQuestionRequestDto parseAdviceQuestionRequestDto,
                                   AdviceRequestList adviceRequestList) throws PersistenceException {
        try {
            for (String questionContent : parseAdviceQuestionRequestDto.getAdQuestionContent()) {
                AdviceQuestion adviceQuestionRequest = AdviceQuestion.builder()
                        .adQuestionContent(questionContent)
                        .adviceRequestList(adviceRequestList)
                        .build();
                adviceQuestionRepository.save(adviceQuestionRequest);
            }
        } catch (PersistenceException p) {
            logger.info("자문 내역 질문지 저장 실패");
            throw new PersistenceException();
        }
    }

    /**
     * 자문 의뢰 신청 파일 저장
     */
    public void saveAdviceFile(AdviceFileRequestDto parseAdviceFileRequestDto,
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
        } catch (PersistenceException p) {
            logger.info("자문 파일 저장 실패");
            throw new PersistenceException();
        }
    }

    /**
     * 자문 의뢰 신청 진료기록 저장
     */
    public void saveAdviceDiagnosisRecord(DiagnosisRecordRequestDto parseDiagnosisRecordRequestDto,
                                          AdviceRequestList adviceRequestList) throws PersistenceException {
        try {
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
        } catch (PersistenceException p) {
            logger.info("진료 기록 저장 실패");
            throw new PersistenceException();
        }
    }

    /**
     * 자문의뢰 상세 조회
     */
    public AllAdviceRequestDto getAdviceRequestDetail(Long adId) {
        AdviceRequestList adviceRequestList = adviceRequestListRepository.findById(adId).get();


        AllAdviceRequestDto allAdviceRequestDto = AllAdviceRequestDto.builder()
                .adId(adviceRequestList.getAdId())
                .adEtc(adviceRequestList.getAdEtc())
                .adMdDate(adviceRequestList.getAdMdDate())
                .adPtCmt(adviceRequestList.getAdPtCmt())
                .adPtSub(adviceRequestList.getAdPtSub())
                .adPtDiagnosis(adviceRequestList.getAdPtDiagnosis())
                .adPtName(adviceRequestList.getAdPtName())
                .adPtRec(adviceRequestList.getAdPtRec())
                .adRegDate(adviceRequestList.getAdRegDate())
                .adPtSsNum(adviceRequestList.getAdPtSsNum())
                .adMdDate(adviceRequestList.getAdMdDate())
                .insureDate(adviceRequestList.getInsureDate())
                .insureName(adviceRequestList.getInsureName())
                .insurance(adviceRequestList.getInsurance())
                .hospital(adviceRequestList.getDiagnosisRecords().get(0).getHospital())
                .admStart(adviceRequestList.getDiagnosisRecords().get(0).getAdmStart())
                .admEnd(adviceRequestList.getDiagnosisRecords().get(0).getAdmEnd())
                .visitStart(adviceRequestList.getDiagnosisRecords().get(0).getVisitStart())
                .visitEnd(adviceRequestList.getDiagnosisRecords().get(0).getVisitEnd())
                .treatCmt(adviceRequestList.getDiagnosisRecords().get(0).getTreatCmt())
                .diagRound(adviceRequestList.getDiagnosisRecords().get(0).getDiagRound())
                .adQuestionContent(Collections.singletonList(adviceRequestList.getAdviceQuestions().get(0).getAdQuestionContent()))
                .adAnswerContent(Collections.singletonList(adviceRequestList.getAdviceQuestions().get(0).getAdAnswerContent()))


                .build();
        return allAdviceRequestDto;
    }

    /**
     * 자문의뢰 수정
     */
    @Transactional
    public boolean updateAdvice(Long adId, AllAdviceRequestDto allAdviceRequestDto) {
        try {
            AdviceRequestList adviceRequestList = adviceRequestListRepository.findById(adId).orElse(null);
            if (adviceRequestList == null) {
                logger.info("해당 자문 의뢰를 찾을 수 없습니다. ID: {}", adId);
                return false;
            }
            updateAdviceRequestList(adviceRequestList, allAdviceRequestDto);
            updateAdviceFile(adviceRequestList, allAdviceRequestDto);
            updateDiagnosisRecord(adviceRequestList, allAdviceRequestDto);

            return true;
        } catch (PersistenceException p) {
            logger.info("자문 의뢰 업데이트 실패");
            return false;
        }
    }

    private void updateAdviceRequestList(AdviceRequestList adviceRequestList, AllAdviceRequestDto allAdviceRequestDto) {
        adviceRequestList.updateAdvice(allAdviceRequestDto.getAdPtName(), allAdviceRequestDto.getAdPtSsNum(),
                allAdviceRequestDto.getAdPtSub(), allAdviceRequestDto.getAdPtDiagnosis(), allAdviceRequestDto.getAdPtRec(),
                allAdviceRequestDto.getAdPtCmt(), allAdviceRequestDto.getInsurance(), allAdviceRequestDto.getInsureDate(),
                allAdviceRequestDto.getInsureName(), allAdviceRequestDto.getAdEtc(), allAdviceRequestDto.getAdRegDate(),
                allAdviceRequestDto.getAdMdDate());

        adviceRequestListRepository.save(adviceRequestList);
    }

    private void updateAdviceFile(AdviceRequestList adviceRequestList, AllAdviceRequestDto allAdviceRequestDto) {
        AdviceFile adviceFile = adviceFileRepository.findByAdviceRequestList(adviceRequestList);
        adviceFile.updateAdviceFile(allAdviceRequestDto.getAdReqForm(), allAdviceRequestDto.getAdDiagnosis(),
                allAdviceRequestDto.getAdRecord(), allAdviceRequestDto.getAdFilm(), allAdviceRequestDto.getAdOther());

        adviceFileRepository.save(adviceFile);
    }

    private void updateDiagnosisRecord(AdviceRequestList adviceRequestList, AllAdviceRequestDto allAdviceRequestDto) {
        DiagnosisRecord diagnosisRecord = diagnosisRecordRepository.findByAdviceRequestList(adviceRequestList);
        diagnosisRecord.updateDiagnosisRecord(allAdviceRequestDto.getHospital(), allAdviceRequestDto.getAdmStart(),
                allAdviceRequestDto.getAdmEnd(), allAdviceRequestDto.getVisitStart(), allAdviceRequestDto.getVisitEnd(),
                allAdviceRequestDto.getTreatCmt(), allAdviceRequestDto.getDiagRound());
        diagnosisRecordRepository.save(diagnosisRecord);
    }
}
