package com.example.medic.consultative.service;

import com.example.medic.advice.domain.*;
import com.example.medic.advice.dto.AdviceSituationDto;
import com.example.medic.advice.dto.AllAdviceRequestDto;
import com.example.medic.advice.repository.*;
import com.example.medic.analyze.domain.AnalyzeRequest;
import com.example.medic.analyze.domain.AnalyzeRequestFile;
import com.example.medic.analyze.domain.AnalyzeRequestList;
import com.example.medic.analyze.dto.AnalyzeRequestDto;
import com.example.medic.analyze.dto.AnalyzeResponseDto;
import com.example.medic.analyze.dto.AnalyzeSituationDto;
import com.example.medic.analyze.repository.AnalyzeAssignmentRepository;
import com.example.medic.analyze.repository.AnalyzeRequestFileRepository;
import com.example.medic.analyze.repository.AnalyzeRequestListRepository;
import com.example.medic.analyze.repository.AnalyzeRequestRepository;
import com.example.medic.client.domain.Client;
import com.example.medic.consultative.domain.Consultative;
import com.example.medic.consultative.dto.ConsultativeDto;
import com.example.medic.consultative.repository.ConsultativeRepository;
import com.example.medic.translation.domain.TranslationAnswerFile;
import com.example.medic.translation.domain.TranslationRequestFile;
import com.example.medic.translation.domain.TranslationRequestList;
import com.example.medic.translation.dto.TranslationRequestDto;
import com.example.medic.translation.dto.TranslationResponseDto;
import com.example.medic.translation.dto.TranslationSituationDto;
import com.example.medic.translation.repository.TranslationAnswerFileRepository;
import com.example.medic.translation.repository.TranslationAssignmentRepository;
import com.example.medic.translation.repository.TranslationRequestFileRepository;
import com.example.medic.translation.repository.TranslationRequestListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ConsultativeAssignmentServiceImpl implements ConsultativeAssignmentService{

    private final ConsultativeRepository consultativeRepository;
    private final AdviceAssignmentRepository adviceAssignmentRepository;
    private final AdviceRequestListRepository adviceRequestListRepository;
    private final AdviceQuestionRepository adviceQuestionRepository;
    private final AdviceFileRepository adviceFileRepository;
    private final DiagnosisRecordRepository diagnosisRecordRepository;
    private final AnalyzeAssignmentRepository analyzeAssignmentRepository;
    private final AnalyzeRequestFileRepository analyzeRequestFileRepository;
    private final AnalyzeRequestListRepository analyzeRequestListRepository;
    private final AnalyzeRequestRepository analyzeRequestRepository;
    private final TranslationAssignmentRepository translationAssignmentRepository;
    private final TranslationRequestListRepository translationRequestListRepository;
    private final TranslationRequestFileRepository translationRequestFileRepository;
    private final TranslationAnswerFileRepository translationAnswerFileRepository;

    /**
     * @return 배정 받은 자문 의뢰 목록 조회
     */
    @Override
    public List<AdviceSituationDto> findAllAssigmentAdvice(ConsultativeDto consultativeDto) throws NoSuchElementException{
        try {
            if (consultativeDto.getCId() == null) {
                throw new NoSuchElementException("해당 전문의를 찾을 수 없습니다.");
            }
            List<AdviceSituationDto> findAllAdviceSituationDto = new ArrayList<>();
            Consultative findConsultative = consultativeRepository.findById(consultativeDto.getCId()).get();
            List<AdviceRequestList> findAllAdviceRequestList = adviceAssignmentRepository.findAllAdviceRequestListByConsultative(findConsultative);
            for (AdviceRequestList adviceRequestList : findAllAdviceRequestList) {
                AdviceSituationDto adviceSituationDto = AdviceSituationDto.builder()
                        .adPtSub(adviceRequestList.getAdPtSub())
                        .adPtDiagnosis(adviceRequestList.getAdPtDiagnosis())
                        .adRegDate(adviceRequestList.getAdRegDate())
                        .adId(adviceRequestList.getAdId())
                        .build();
                findAllAdviceSituationDto.add(adviceSituationDto);
            }
            return findAllAdviceSituationDto;
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException();
        }
    }

    /**
     * @return 배정 받은 특정 자문 의뢰 상세 조회
     */
    @Override
    public AllAdviceRequestDto findAssigmentAdviceDetail(ConsultativeDto consultativeDto,
                                                         AllAdviceRequestDto allAdviceRequestDto) throws NoSuchElementException {
        try {
            if (consultativeDto.getCId() == null) {
                throw new NoSuchElementException();
            }
            AdviceRequestList findAdviceRequestList = adviceRequestListRepository.findById(allAdviceRequestDto.getAdId()).get();
            Client requestClient = adviceRequestListRepository.findClientByAdId(allAdviceRequestDto.getAdId());
            List<AdviceQuestion> findAdviceQuestion = adviceQuestionRepository.findAllByAdviceRequestList(findAdviceRequestList);
            AdviceFile findAdviceFile = adviceFileRepository.findByAdviceRequestList(findAdviceRequestList);
            DiagnosisRecord findDiagnosisRecord = diagnosisRecordRepository.findByAdviceRequestList(findAdviceRequestList);

            return createResponseAllAdviceDto(findAdviceRequestList, requestClient, findAdviceQuestion,
                    findAdviceFile, findDiagnosisRecord);
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException();
        }
    }

    /**
     * @return 신청된 의료 자문 정보 dto 생성
     */
    public AllAdviceRequestDto createResponseAllAdviceDto (AdviceRequestList findAdviceRequestList, Client requestClient,
                                                           List<AdviceQuestion> findAdviceQuestionList, AdviceFile findAdviceFile,
                                                           DiagnosisRecord findDiagnosisRecord) {
        List<String> questionContent = new ArrayList<>();
        List<String> answerContent = new ArrayList<>();
        for (AdviceQuestion adviceQuestion : findAdviceQuestionList) {
            questionContent.add(adviceQuestion.getAdQuestionContent());
//            if (adviceQuestion.getAdAnswerContent() != null) {
//                answerContent.add(adviceQuestion.getAdAnswerContent());
//            }
            answerContent.add(adviceQuestion.getAdAnswerContent());
        }

        return AllAdviceRequestDto.builder()
                .uName(requestClient.getUName())
                .userTel(requestClient.getUserTel())
                .userPhone(requestClient.getUserPhone())
                .userAddress(requestClient.getUserAddress())
                .adPtName(findAdviceRequestList.getAdPtName())
                .adPtSsNum(findAdviceRequestList.getAdPtSsNum())
                .adPtSub(findAdviceRequestList.getAdPtSub())
                .adPtDiagnosis(findAdviceRequestList.getAdPtDiagnosis())
                .adPtRec(findAdviceRequestList.getAdPtRec())
                .adPtCmt(findAdviceRequestList.getAdPtCmt())
                .insurance(findAdviceRequestList.getInsurance())
                .insureDate(findAdviceRequestList.getInsureDate())
                .insureName(findAdviceRequestList.getInsureName())
                .hospital(findDiagnosisRecord.getHospital())
                .admStart(findDiagnosisRecord.getAdmStart())
                .admEnd(findDiagnosisRecord.getAdmEnd())
                .visitStart(findDiagnosisRecord.getVisitStart())
                .visitEnd(findDiagnosisRecord.getVisitEnd())
                .treatCmt(findDiagnosisRecord.getTreatCmt())
                .diagRound(findDiagnosisRecord.getDiagRound())
                .adEtc(findAdviceRequestList.getAdEtc())
                .adQuestionContent(questionContent)
                .adAnswerContent(answerContent)
                .adReqForm(findAdviceFile.getAdReqForm())
                .adDiagnosis(findAdviceFile.getAdDiagnosis())
                .adRecord(findAdviceFile.getAdRecord())
                .adFilm(findAdviceFile.getAdFilm())
//                .adOther(findAdviceFile.getAdOther())
                .build();
    }

    /**
     * @return 배정 받은 분석 의뢰 목록 조회
     */
    @Override
    public List<AnalyzeSituationDto> findAllAssigmentAnalyze(ConsultativeDto consultativeDto) throws NoSuchElementException {
        try {
            if (consultativeDto.getCId() == null) {
                throw new NoSuchElementException("해당 전문의를 찾을 수 없습니다.");
            }
            List<AnalyzeSituationDto> findAllAnalyzeSituationDto = new ArrayList<>();
            Consultative findConsultative = consultativeRepository.findById(consultativeDto.getCId()).get();
            List<AnalyzeRequestList> findAllAnalyzeRequestList = analyzeAssignmentRepository.findAllAnalyzeRequestListByConsultative(findConsultative);
            for (AnalyzeRequestList analyzeRequestList : findAllAnalyzeRequestList) {
                AnalyzeSituationDto analyzeSituationDto = AnalyzeSituationDto.builder()
                        .anPtSub(analyzeRequestList.getAnPtSub())
                        .anPtDiagnosis(analyzeRequestList.getAnPtDiagnosis())
                        .anRegDate(analyzeRequestList.getAnRegDate())
                        .anId(analyzeRequestList.getAnId())
                        .build();
                findAllAnalyzeSituationDto.add(analyzeSituationDto);
            }
            return findAllAnalyzeSituationDto;
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException();
        }
    }


    /**
     * @return 배정 받은 특정 분석 의뢰 상세 조회
     */
    @Override
    public AnalyzeResponseDto findAssignmentAnalyzeDetail(ConsultativeDto consultativeDto,
                                                         AnalyzeRequestDto analyzeRequestDto) throws NoSuchElementException {
        try {
            if (consultativeDto.getCId() == null) {
                throw new NoSuchElementException();
            }
            AnalyzeRequestList findAnalyzeRequestList = analyzeRequestListRepository.findById(analyzeRequestDto.getAnId()).get();
            Client requestClient = analyzeRequestListRepository.findClientByAnId(findAnalyzeRequestList.getAnId());
            List<AnalyzeRequest> findAnalyzeQuestion = analyzeRequestRepository.findAllByAnalyzeRequestList(findAnalyzeRequestList);
            AnalyzeRequestFile findAnalyzeFile = analyzeRequestFileRepository.findByAnalyzeRequestList(findAnalyzeRequestList);

            return createResponseAnalyzeDto(findAnalyzeRequestList, requestClient, findAnalyzeQuestion, findAnalyzeFile);
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException();
        }
    }

    /**
     * @return 신청된 의료 분석 정보 응답 dto 생성
     */
    private AnalyzeResponseDto createResponseAnalyzeDto(AnalyzeRequestList findAnalyzeRequestList, Client requestClient,
                                                        List<AnalyzeRequest> findAnalyzeQuestion, AnalyzeRequestFile findAnalyzeFile) {
        List<String> questionContent = new ArrayList<>();
        List<String> answerContent = new ArrayList<>();
        for (AnalyzeRequest analyzeRequest : findAnalyzeQuestion) {
            questionContent.add(analyzeRequest.getAnQuestionContent());
//            if (analyzeRequest.getAnAnswerContent() != null) {
//                answerContent.add(analyzeRequest.getAnAnswerContent());
//            }
            answerContent.add(analyzeRequest.getAnAnswerContent());
        }

        return AnalyzeResponseDto.builder()
                .uName(requestClient.getUName())
                .userTel(requestClient.getUserTel())
                .userPhone(requestClient.getUserPhone())
                .userAddress(requestClient.getUserAddress())
                .anPtName(findAnalyzeRequestList.getAnPtName())
                .anPtSsNum(findAnalyzeRequestList.getAnPtSsNum())
                .anPtSub(findAnalyzeRequestList.getAnPtSub())
                .anPtDiagnosis(findAnalyzeRequestList.getAnPtDiagnosis())
                .anPtDiagContent(findAnalyzeRequestList.getAnPtDiagContent())
                .anEtc(findAnalyzeRequestList.getAnEtc())
                .anQuestionContent(questionContent)
                .anAnswerContent(answerContent)
                .anReqForm(findAnalyzeFile.getAnReqForm())
                .anDiagnosis(findAnalyzeFile.getAnDiagnosis())
                .anRecord(findAnalyzeFile.getAnRecord())
                .anFilm(findAnalyzeFile.getAnFilm())
                .anOther(findAnalyzeFile.getAnOther())
                .build();
    }

    /**
     * @return 배정 받은 번역 의뢰 목록 조회
     */
    @Override
    public List<TranslationSituationDto> findAllAssigmentTranslation(ConsultativeDto consultativeDto) throws NoSuchElementException {
        try {
            if (consultativeDto.getCId() == null) {
                throw new NoSuchElementException("해당 전문의를 찾을 수 없습니다.");
            }
            List<TranslationSituationDto> findAllTranslationSituationDto = new ArrayList<>();
            Consultative findConsultative = consultativeRepository.findById(consultativeDto.getCId()).get();
            List<TranslationRequestList> findAllTranslationRequestList =
                    translationAssignmentRepository.findAllTranslationRequestListByConsultative(findConsultative);
            for (TranslationRequestList translationRequestList : findAllTranslationRequestList) {
                TranslationSituationDto translationRequestDto = TranslationSituationDto.builder()
                        .trPtSub(translationRequestList.getTrPtSub())
                        .trPtDiagnosis(translationRequestList.getTrPtDiagnosis())
                        .trRegDate(translationRequestList.getTrRegDate())
                        .trId(translationRequestList.getTrId())
                        .build();
                findAllTranslationSituationDto.add(translationRequestDto);
            }
            return findAllTranslationSituationDto;
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException();
        }
    }

    /**
     * @return 배정 받은 특정 번역 의뢰 상세 조회
     */
    @Override
    public TranslationResponseDto findAssignmentTranslationDetail(ConsultativeDto consultativeDto,
                                                                  TranslationRequestDto translationRequestDto) throws NoSuchElementException {
        try {
            if (consultativeDto.getCId() == null) {
                throw new NoSuchElementException();
            }
            TranslationRequestList findTranslationRequestList =
                    translationRequestListRepository.findById(translationRequestDto.getTrId()).get();
            Client requestClient = translationRequestListRepository.findClientByTrId(findTranslationRequestList.getTrId());
            TranslationRequestFile findTranslationRequestFile =
                    translationRequestFileRepository.findByTranslationRequestList(findTranslationRequestList);
            TranslationAnswerFile findTranslationAnswerFile =
                    translationAnswerFileRepository.findByTranslationRequestList(findTranslationRequestList);

            return createTranslationResponseDto(findTranslationRequestList, requestClient, findTranslationRequestFile, findTranslationAnswerFile);
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException();
        }
    }

    /**
     * @return 신청된 의료 번역 정보 응답 dto 생성
     */
    private TranslationResponseDto createTranslationResponseDto(TranslationRequestList findTranslationRequestList, Client requestClient,
                                                                TranslationRequestFile findTranslationRequestFile,
                                                                TranslationAnswerFile findTranslationAnswerFile) {
        return TranslationResponseDto.builder()
                .uName(requestClient.getUName())
                .userTel(requestClient.getUserTel())
                .userPhone(requestClient.getUserPhone())
                .userAddress(requestClient.getUserAddress())
                .trPtName(findTranslationRequestList.getTrPtName())
                .trPtSsNum(findTranslationRequestList.getTrPtSsNum())
                .trPtSub(findTranslationRequestList.getTrPtSub())
                .trPtDiagnosis(findTranslationRequestList.getTrPtDiagnosis())
                .trPtDiagContent(findTranslationRequestList.getTrPtDiagContent())
                .trEtc(findTranslationRequestList.getTrEtc())
                .trMtl(findTranslationRequestFile.getTrMtl())
                .trAnswer(findTranslationAnswerFile.getTrAnswer())
                .build();
    }
}
