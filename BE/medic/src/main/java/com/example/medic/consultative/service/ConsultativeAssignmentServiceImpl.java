package com.example.medic.consultative.service;

import com.example.medic.advice.domain.*;
import com.example.medic.advice.dto.AdviceSituationDto;
import com.example.medic.advice.dto.AllAdviceRequestDto;
import com.example.medic.advice.repository.*;
import com.example.medic.analyze.dto.AnalyzeRequestDto;
import com.example.medic.analyze.dto.AnalyzeSituationDto;
import com.example.medic.client.domain.Client;
import com.example.medic.consultative.domain.Consultative;
import com.example.medic.consultative.dto.ConsultativeDto;
import com.example.medic.consultative.repository.ConsultativeRepository;
import com.example.medic.translation.dto.TranslationRequestDto;
import com.example.medic.translation.dto.TranslationSituationDto;
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
            List<AdviceRequestList> findAllAdviceRequestList = adviceAssignmentRepository.findAdviceRequestListByConsultative(findConsultative);
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
                .adOther(findAdviceFile.getAdOther())
                .build();
    }

    @Override
    public List<AnalyzeSituationDto> findAllAssigmentAnalyze(ConsultativeDto consultativeDto) {
        return null;
    }

    @Override
    public AnalyzeRequestDto findAssignmentAnalyzeDetail(ConsultativeDto consultativeDto, AnalyzeSituationDto AnalyzeSituationDto) {
        return null;
    }

    @Override
    public List<TranslationSituationDto> findAllAssigmentTranslation(ConsultativeDto consultativeDto) {
        return null;
    }

    @Override
    public TranslationRequestDto findAssignmentTranslationDetail(TranslationRequestDto translationRequestDto, TranslationSituationDto translationSituationDto) {
        return null;
    }
}
