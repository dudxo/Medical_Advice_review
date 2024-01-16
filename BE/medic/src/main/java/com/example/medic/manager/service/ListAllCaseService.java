package com.example.medic.manager.service;

import com.example.medic.advice.domain.AdviceAssignment;
import com.example.medic.advice.domain.AdviceQuestion;
import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.advice.repository.AdviceAssignmentRepository;
import com.example.medic.advice.repository.AdviceQuestionRepository;
import com.example.medic.advice.repository.AdviceRequestListRepository;
import com.example.medic.client.domain.Client;
import com.example.medic.consultative.domain.Consultative;
import com.example.medic.consultative.repository.ConsultativeRepository;
import com.example.medic.manager.dto.AdviceListDto;
import com.example.medic.manager.dto.DocSetDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.print.Doc;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ListAllCaseService {
    private static final Logger logger = LoggerFactory.getLogger(ListAllCaseService.class);
    private final AdviceRequestListRepository adviceRequestListRepository;
    private final AdviceAssignmentRepository adviceAssignmentRepository;
    private final AdviceQuestionRepository adviceQuestionRepository;
    private final ConsultativeRepository consultativeRepository;


    public List<AdviceListDto> adList() {
        List<AdviceRequestList> adviceRequestLists = adviceRequestListRepository.findAll();
        Map<Long, AdviceListDto> adviceListDtoMap = new HashMap<>();

        logger.info("alstj1:{}",adviceRequestLists);
        for (AdviceRequestList adviceRequestList : adviceRequestLists) {
            String uName = getClientName(adviceRequestList.getClient());
            List<AdviceQuestion> adviceQuestions = adviceRequestList.getAdviceQuestions();
            logger.info("alstj2:{}",adviceQuestions);
            for (AdviceQuestion adviceQuestion : adviceQuestions) {
                AdviceListDto adviceListDto = convertToDTO(adviceRequestList, uName, adviceQuestion);
                logger.info("alstj2:{}",adviceListDto);
                if (!adviceListDtoMap.containsKey(adviceListDto.getAdId())) {
                    adviceListDtoMap.put(adviceListDto.getAdId(), adviceListDto);
                }
            }
        }

        return new ArrayList<>(adviceListDtoMap.values());
    }


    private String getClientName(Client client) {
        return (client != null) ? client.getUName() : null;
    }

    private AdviceListDto convertToDTO(AdviceRequestList adviceRequestList, String clientName, AdviceQuestion adviceQuestion) {
        String admProgressStatus = null;
        if (adviceRequestList.getAdviceAssignment() != null) {
            admProgressStatus = adviceRequestList.getAdviceAssignment().getAdmProgressStatus();
        }
        AdviceAssignment adviceAssignment = adviceRequestList.getAdviceAssignment();
        logger.info("alstj5:{}",adviceAssignment);
        Consultative consultative = adviceAssignment.getConsultative();

        logger.info("alstj6:{}" ,consultative);
        String cName = null;
        if (consultative != null){
            cName= consultative.getCName();
        }
        logger.info("alstj7:{}",cName);

        return new AdviceListDto(

                adviceRequestList.getAdId(),
                adviceRequestList.getAdPtName(),
                adviceRequestList.getAdPtSsNum(),
                adviceRequestList.getAdPtSub(),
                adviceRequestList.getAdPtDiagnosis(),
                adviceRequestList.getAdPtRec(),
                adviceRequestList.getAdPtCmt(),
                adviceRequestList.getInsurance(),
                adviceRequestList.getInsureDate(),
                adviceRequestList.getInsureName(),
                adviceRequestList.getAdEtc(),
                adviceRequestList.getAdMdDate(),
                adviceRequestList.getAdRegDate(),
                clientName,
                (adviceRequestList.getAdviceAssignment() != null && adviceRequestList.getAdviceAssignment().getAdmDate() != null) ? adviceRequestList.getAdviceAssignment().getAdmDate() : null,
                adviceQuestion.getAdAnswerDate()
                ,admProgressStatus
                ,cName
        );
    }


    public void updateAdviceList(List<AdviceListDto> adviceListDtos) {

        for (AdviceListDto adviceListDto : adviceListDtos) {
            Long adviceId = adviceListDto.getAdId();
            AdviceRequestList adviceRequestList = adviceRequestListRepository.findById(adviceId).get();
            AdviceAssignment adviceAssignment = adviceAssignmentRepository.findByAdId(adviceId);
            AdviceQuestion adviceQuestion = adviceQuestionRepository.findByAdId(adviceId);

            logger.info("ad:{}", adviceListDto.getAdmProgressStatus());
            if (adviceAssignment != null) {
                Optional<AdviceAssignment> existingAssignment = adviceAssignmentRepository.findById(adviceAssignment.getAdmId());

                existingAssignment.ifPresent(existing -> {
                    existing.setAdmDate(adviceListDto.getAdMdDate());
                    existing.setAdmProgressStatus(adviceListDto.getAdmProgressStatus());

                    // 해당 엔터티의 ID를 기반으로 업데이트

                    adviceAssignmentRepository.save(existing);

                    logger.info("getadmprogress:{}", existing.getAdmProgressStatus());
                });
            }
            if (adviceQuestion != null) {
                AdviceQuestion adviceQuestion1 = adviceQuestion.toBuilder()
//                        .adQid(adviceQuestion.getAdQid())
                        .adAnswerDate(adviceListDto.getAdAnswerDate())
                        .build();
                logger.info("getadanswerdate:{}", adviceQuestion.getAdAnswerDate());

                adviceQuestionRepository.save(adviceQuestion1);
            }
        }

    }



    public List<DocSetDto> consultatives(){
        List<Consultative> consultatives = consultativeRepository.findAll();
        List<DocSetDto> docSetDtos = new ArrayList<>();

        for (Consultative consultative : consultatives) {
            DocSetDto docSetDto = setDto(consultative);
            docSetDtos.add(docSetDto);
        }

        return docSetDtos;

    }

    public DocSetDto setDto(Consultative consultative){
        return new DocSetDto(
                consultative.getCName(),
                consultative.getCPhone(),
                consultative.getDepartment(),
                consultative.getHospName(),
                consultative.getHospTel()

        );
    }

//    public DocSetDto setDoc(Long adId, DocSetDto dto){
//        AdviceRequestList adviceRequestList = adviceRequestListRepository.findById(adId).get();
//        AdviceAssignment adviceAssignment = adviceRequestList.getAdviceAssignment();
////        Consultative consultative = consultativeRepository.findById()
//        AdviceAssignment adviceAssignment1 = adviceAssignment.toBuilder()
//                .consultative(consultative)
//                .build();
//    }
}