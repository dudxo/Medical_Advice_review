package com.example.medic.advice.service;

import com.example.medic.advice.domain.*;
import com.example.medic.advice.dto.*;
import com.example.medic.advice.repository.*;
import com.example.medic.analyze.domain.AnalyzeRequest;
import com.example.medic.analyze.domain.AnalyzeRequestList;
import com.example.medic.analyze.dto.AnalyzeResponseDto;
import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.client.service.ClientService;
import com.example.medic.files.handler.FileHandler;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceException;
import java.time.LocalDate;
import java.util.*;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
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
    private final FileHandler fileHandler;

    private final ClientService clientService;

    /**
     * @return 자문 의뢰 신청 저장
     */
    @Transactional
    public boolean saveAdviceRequest(AllAdviceRequestDto allAdviceRequestDto, ClientInfoDto clientInfoDto, List<MultipartFile> multipartFiles) throws IOException {
        Client client = clientService.findClient(clientInfoDto.getUId());
        AdviceFileRequestDto parseAdviceFileRequestDto = splitRequestToFileDto(allAdviceRequestDto, multipartFiles);
        AdviceQuestionRequestDto parseAdviceQuestionRequestDto = splitRequestToQuestionDto(allAdviceRequestDto);
        AdviceRequestListDto parseAdviceRequestListDto = splitRequestToRequestListDto(allAdviceRequestDto);
        DiagnosisRecordRequestDto parseDiagnosisRecordRequestDto = parseDiagnosisRecordRequestDto(allAdviceRequestDto);

        try {

            AdviceRequestList savedAdviceRequestList = saveAdviceRequestList(parseAdviceRequestListDto, client);
            saveAdviceFile(savedAdviceRequestList, parseAdviceFileRequestDto);
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

    public AdviceFileRequestDto splitRequestToFileDto(AllAdviceRequestDto allAdviceRequestDto, List<MultipartFile> multipartFiles) throws IOException {
        if (multipartFiles.size() != 0 && multipartFiles.size() > 0) {
            Path projectPath;
            if (System.getProperty("user.dir").contains("medic")) {
                projectPath = Paths.get(System.getProperty("user.dir") + "/src/main/resources/static/file/advicerequest/");
            } else {
                projectPath = Paths.get(System.getProperty("user.dir") + "/medic/src/main/resources/static/file/advicerequest/");
            }

            Deque <String> files = fileHandler.parseFile(projectPath, multipartFiles);

            return AdviceFileRequestDto.builder()
                    .adReqForm(allAdviceRequestDto.getAdReqForm().equals("no_empty_file") ? files.pollFirst() : allAdviceRequestDto.getAdReqForm())
                    .adDiagnosis(allAdviceRequestDto.getAdDiagnosis().equals("no_empty_file") ? files.pollFirst(): allAdviceRequestDto.getAdDiagnosis())
                    .adRecord(allAdviceRequestDto.getAdRecord().equals("no_empty_file") ? files.pollFirst(): allAdviceRequestDto.getAdRecord())
                    .adFilm(allAdviceRequestDto.getAdFilm().equals("no_empty_file") ? files.pollFirst() : allAdviceRequestDto.getAdRecord())
                    .adOther(allAdviceRequestDto.getAdOther().equals("no_empty-file") ? files.pollFirst() : allAdviceRequestDto.getAdOther())
                    .build();
        }
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
    public void saveAdviceFile(AdviceRequestList adviceRequestList, AdviceFileRequestDto adviceFileRequestDto) throws PersistenceException {
        try {
            AdviceFile adviceFile = AdviceFile.builder()
                    .adReqForm(adviceFileRequestDto.getAdReqForm())
                    .adDiagnosis(adviceFileRequestDto.getAdDiagnosis())
                    .adRecord(adviceFileRequestDto.getAdRecord())
                    .adFilm(adviceFileRequestDto.getAdFilm())
                    .adOther(adviceFileRequestDto.getAdOther())
                    .adviceRequestList(adviceRequestList)
                    .build();
            adviceFileRepository.save(adviceFile);
        } catch (Exception e) {
            throw new RuntimeException(e);
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
        AdviceFile adviceFile = adviceFileRepository.findById(adId).get();

        List<AdviceQuestion> adviceQuestions = adviceRequestList.getAdviceQuestions();
        List<String> questionContents = new ArrayList<>();
        List<String> answerContents = new ArrayList<>();

        for (AdviceQuestion adviceQuestion : adviceQuestions) {
            questionContents.add(adviceQuestion.getAdQuestionContent());
            answerContents.add(adviceQuestion.getAdAnswerContent());
        }

        // 병원진단 정보 가져오기
        DiagnosisRecord diagnosisRecord = adviceRequestList.getDiagnosisRecords().get(0); // 하나의 진단기록만 있다고 가정
        String hospital = diagnosisRecord.getHospital();
        String admStart = diagnosisRecord.getAdmStart();
        String admEnd = diagnosisRecord.getAdmEnd();
        String visitStart = diagnosisRecord.getVisitStart();
        String visitEnd = diagnosisRecord.getVisitEnd();
        String treatCmt = diagnosisRecord.getTreatCmt();

        AllAdviceRequestDto allAdviceRequestDto = AllAdviceRequestDto.builder()
                .adEtc(adviceRequestList.getAdEtc())
                .adPtName(adviceRequestList.getAdPtName())
                .adPtSub(adviceRequestList.getAdPtSub())
                .adPtSsNum(adviceRequestList.getAdPtSsNum())
                .adPtDiagnosis(adviceRequestList.getAdPtDiagnosis())
                .adPtRec(adviceRequestList.getAdPtRec())
                .adPtCmt(adviceRequestList.getAdPtCmt())
                .insurance(adviceRequestList.getInsurance())
                .insureDate(adviceRequestList.getInsureDate())
                .insureName(adviceRequestList.getInsureName())
                .hospital(adviceRequestList.getDiagnosisRecords().get(0).getHospital())
                .admStart(adviceRequestList.getDiagnosisRecords().get(0).getAdmStart())
                .admEnd(adviceRequestList.getDiagnosisRecords().get(0).getAdmEnd())
                .visitStart(adviceRequestList.getDiagnosisRecords().get(0).getVisitStart())
                .visitEnd(adviceRequestList.getDiagnosisRecords().get(0).getVisitEnd())
                .treatCmt(adviceRequestList.getDiagnosisRecords().get(0).getTreatCmt())
                .diagRound(adviceRequestList.getDiagnosisRecords().get(0).getDiagRound())
                .adQuestionContent(Collections.singletonList(adviceRequestList.getAdviceQuestions().get(0).getAdQuestionContent()))
                .adAnswerContent(Collections.singletonList(adviceRequestList.getAdviceQuestions().get(0).getAdAnswerContent()))
                .adReqForm(adviceFile.getAdReqForm())
                .adDiagnosis(adviceFile.getAdDiagnosis())
                .adRecord(adviceFile.getAdRecord())
                .adFilm(adviceFile.getAdFilm())
                .adOther(adviceFile.getAdOther())
                .build();

        return allAdviceRequestDto;
    }

    /**
     * 자문의뢰 수정
     */
    @Transactional
    public boolean updateAdviceRequest(Long adId, AdviceUpdateDto updateDto) {
        AdviceRequestList adviceRequestList = adviceRequestListRepository.findById(adId).orElse(null);

        // 자문의뢰 리스트 수정
        AdviceRequestList updatedAdviceRequestList = adviceRequestList.toBuilder()
                .adEtc(updateDto.getAdEtc())
                .adPtName(updateDto.getAdPtName())
                .adPtSub(updateDto.getAdPtSub())
                .adPtSsNum(updateDto.getAdPtSsNum())
                .adPtDiagnosis(updateDto.getAdPtDiagnosis())
                .adPtRec(updateDto.getAdPtRec())
                .adPtCmt(updateDto.getAdPtCmt())
                .insurance(updateDto.getInsurance())
                .insureDate(updateDto.getInsureDate())
                .insureName(updateDto.getInsureName())
                .build();

        // 병원진단 사항 수정
        DiagnosisRecord diagnosisRecord = adviceRequestList.getDiagnosisRecords().get(0); // 병원진단은 하나의 레코드만 있다고 가정
        diagnosisRecord.updateDiagnosisRecord(
                updateDto.getHospital(),
                updateDto.getAdmStart(),
                updateDto.getAdmEnd(),
                updateDto.getVisitStart(),
                updateDto.getVisitEnd(),
                updateDto.getTreatCmt(),
                updateDto.getDiagRound()
        );

        // 자문의뢰 질문지 수정
        List<AdviceQuestion> adviceQuestions = adviceRequestList.getAdviceQuestions();
        List<String> updatedQuestionContents = updateDto.getAdQuestionContent();

        List<AdviceQuestion> updatedAdviceQuestions = new ArrayList<>();
        for (int i = 0; i < adviceQuestions.size() && i < updatedQuestionContents.size(); i++) {
            AdviceQuestion adviceQuestion = adviceQuestions.get(i);
            AdviceQuestion updatedAdviceQuestion = adviceQuestion.toBuilder()
                    .adQuestionContent(updatedQuestionContents.get(i))
                    .adviceRequestList(updatedAdviceRequestList)
                    .build();
            updatedAdviceQuestions.add(updatedAdviceQuestion);
        }

        // 자문의뢰 리스트에 새로운 질문지 설정
        updatedAdviceRequestList.getAdviceQuestions().addAll(updatedAdviceQuestions);

        // 수정일자 업데이트
        updatedAdviceRequestList = updatedAdviceRequestList.toBuilder()
                .adMdDate(LocalDate.now())
                .build();

        // 자문의뢰 리스트 저장
        adviceRequestListRepository.save(updatedAdviceRequestList);

        return true;
    }
}

