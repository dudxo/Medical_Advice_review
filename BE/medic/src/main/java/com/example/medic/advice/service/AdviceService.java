package com.example.medic.advice.service;

import com.example.medic.advice.domain.*;
import com.example.medic.advice.dto.*;
import com.example.medic.advice.repository.*;
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

import javax.persistence.PersistenceException;
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
    public boolean saveAdviceRequest(AllAdviceRequestDto allAdviceRequestDto, ClientInfoDto clientInfoDto, List<MultipartFile> multipartFiles) {
        Client client = clientService.findClient(clientInfoDto.getUId());
//        AdviceFileRequestDto parseAdviceFileRequestDto = splitRequestToFileDto(allAdviceRequestDto);
        AdviceQuestionRequestDto parseAdviceQuestionRequestDto = splitRequestToQuestionDto(allAdviceRequestDto);
        AdviceRequestListDto parseAdviceRequestListDto = splitRequestToRequestListDto(allAdviceRequestDto);
        DiagnosisRecordRequestDto parseDiagnosisRecordRequestDto = parseDiagnosisRecordRequestDto(allAdviceRequestDto);

        try{

            AdviceRequestList savedAdviceRequestList = saveAdviceRequestList(parseAdviceRequestListDto, client);
            saveAdviceFile(savedAdviceRequestList, multipartFiles);
            saveAdviceQuestion(parseAdviceQuestionRequestDto, savedAdviceRequestList);
            saveAdviceDiagnosisRecord(parseDiagnosisRecordRequestDto, savedAdviceRequestList);

            AdviceAssignment adviceAssignment = AdviceAssignment.builder()
                    .adviceRequestList(savedAdviceRequestList)
                    .build();
            adviceAssignmentRepository.save(adviceAssignment);

            return true;
        }catch (PersistenceException p){
            logger.info("자문 의뢰 신청 저장 실패");
            return false;
        }
    }


//    /**
//     * @return 자문 의뢰 신청 파일 변환
//     */
//    public AdviceFileRequestDto splitRequestToFileDto(AllAdviceRequestDto allAdviceRequestDto) {
//        return AdviceFileRequestDto.builder()
//                .adReqForm(allAdviceRequestDto.getAdReqForm())
//                .adDiagnosis(allAdviceRequestDto.getAdDiagnosis())
//                .adRecord(allAdviceRequestDto.getAdRecord())
//                .adFilm(allAdviceRequestDto.getAdFilm())
//                .adOther(allAdviceRequestDto.getAdOther())
//                .build();
//    }

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
        }catch (PersistenceException p){
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
            for(String questionContent : parseAdviceQuestionRequestDto.getAdQuestionContent()){
                AdviceQuestion adviceQuestionRequest = AdviceQuestion.builder()
                        .adQuestionContent(questionContent)
                        .adviceRequestList(adviceRequestList)
                        .build();
                adviceQuestionRepository.save(adviceQuestionRequest);
            }
        }catch (PersistenceException p){
            logger.info("자문 내역 질문지 저장 실패");
            throw new PersistenceException();
        }
    }

    /**
     * 자문 의뢰 신청 파일 저장
     */
    public void saveAdviceFile(AdviceRequestList adviceRequestList, List<MultipartFile> multipartFiles) throws PersistenceException {

        try {
            if(multipartFiles.size() !=0) {
                Path projectPath = Paths.get(System.getProperty("user.dir") + "/medic/src/main/resources/static/file/advicerequest/");
                List<String> files = fileHandler.parseFile(projectPath, multipartFiles);
                AdviceFile adviceFile = AdviceFile.builder()
                        .adReqForm(files.get(0))
                        .adDiagnosis(files.get(1))
                        .adRecord(files.get(2))
                        .adFilm(files.get(3))
                        .adviceRequestList(adviceRequestList)
                        .build();
                adviceFileRepository.save(adviceFile);
            }
        }catch (PersistenceException p){
            logger.info("자문 파일 저장 실패");
            throw new PersistenceException();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 자문 의뢰 신청 진료기록 저장
     */
    public void saveAdviceDiagnosisRecord(DiagnosisRecordRequestDto parseDiagnosisRecordRequestDto,
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
        }catch (PersistenceException p){
            logger.info("진료 기록 저장 실패");
            throw new PersistenceException();
        }
    }
}
