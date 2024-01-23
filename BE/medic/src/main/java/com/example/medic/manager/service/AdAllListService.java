package com.example.medic.manager.service;

import com.example.medic.advice.domain.AdviceAssignment;
import com.example.medic.advice.domain.AdviceQuestion;
import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.advice.domain.DiagnosisRecord;
import com.example.medic.advice.repository.AdviceAssignmentRepository;
import com.example.medic.advice.repository.AdviceQuestionRepository;
import com.example.medic.advice.repository.AdviceRequestListRepository;
import com.example.medic.client.domain.Client;
import com.example.medic.consultative.domain.Consultative;
import com.example.medic.consultative.repository.ConsultativeRepository;
import com.example.medic.manager.dto.AdDetailDto;
import com.example.medic.manager.dto.AdviceListDto;
import com.example.medic.manager.dto.DocSetDto;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.asm.Advice;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AdAllListService {
    private static final Logger logger = LoggerFactory.getLogger(AdAllListService.class);
    private final AdviceRequestListRepository adviceRequestListRepository;
    private final AdviceAssignmentRepository adviceAssignmentRepository;
    private final AdviceQuestionRepository adviceQuestionRepository;
    private final ConsultativeRepository consultativeRepository;


    /*
    자문 목록 조회
     */
    public List<AdviceListDto> adList() {
        List<AdviceRequestList> adviceRequestLists = adviceRequestListRepository.findAll();
        Map<Long, AdviceListDto> adviceListDtoMap = new HashMap<>();

        for (AdviceRequestList adviceRequestList : adviceRequestLists) {
            String uName = getClientName(adviceRequestList.getClient());
            List<AdviceQuestion> adviceQuestions = adviceRequestList.getAdviceQuestions();

            for (AdviceQuestion adviceQuestion : adviceQuestions) {
                AdviceListDto adviceListDto = convertToDTO(adviceRequestList, uName, adviceQuestion);

                if (!adviceListDtoMap.containsKey(adviceListDto.getAdId())) {
                    adviceListDtoMap.put(adviceListDto.getAdId(), adviceListDto);
                }
            }
        }

        return new ArrayList<>(adviceListDtoMap.values());
    }


    /*
    유저조회
     */
    private String getClientName(Client client) {
        return (client != null) ? client.getUName() : null;
    }

    /*
    dto 값 지정
     */
    private AdviceListDto convertToDTO(AdviceRequestList adviceRequestList, String clientName, AdviceQuestion adviceQuestion) {
        String admProgressStatus = null;
        if (adviceRequestList.getAdviceAssignment() != null) {
            admProgressStatus = adviceRequestList.getAdviceAssignment().getAdmProgressStatus();
        }
        AdviceAssignment adviceAssignment = adviceRequestList.getAdviceAssignment();

        Consultative consultative = adviceAssignment.getConsultative();

        String cName = null;
        if (consultative != null){
            cName= consultative.getCName();
        }

        return new AdviceListDto(

                adviceRequestList.getAdId(),
                adviceRequestList.getAdPtDiagnosis(),
                adviceRequestList.getAdRegDate(),
                clientName,
                (adviceRequestList.getAdviceAssignment() != null && adviceRequestList.getAdviceAssignment().getAdmDate() != null) ? adviceRequestList.getAdviceAssignment().getAdmDate() : null,
                adviceQuestion.getAdAnswerDate()
                ,admProgressStatus
                ,cName
        );
    }


    /*
    배정일 및 진행상황 수정
     */
    public void updateAdviceList(List<AdviceListDto> adviceListDtos) {

        for (AdviceListDto adviceListDto : adviceListDtos) {
            Long adviceId = adviceListDto.getAdId();

            AdviceAssignment adviceAssignment = adviceAssignmentRepository.findByAdId(adviceId);
            AdviceQuestion adviceQuestion = adviceQuestionRepository.findByAdId(adviceId);

            if (adviceAssignment != null) {

                adviceAssignment.updateStatusAndAdmDate(adviceListDto.getAdmDate(),adviceListDto.getAdmProgressStatus());
                adviceAssignmentRepository.save(adviceAssignment);
            }
            if (adviceQuestion != null) {
                adviceQuestion.updateAdAnswerDate(adviceListDto.getAdAnswerDate());

                adviceQuestionRepository.save(adviceQuestion);
            }
        }

    }


    /*
    전문의 목록
     */

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
                consultative.getHospTel(),
                consultative.getCId()

        );
    }

    /*
전문의 배정
 */
    public boolean setDoc(Long adId, DocSetDto dto){
        try{
            AdviceRequestList adviceRequestList = adviceRequestListRepository.findById(adId).get();

            AdviceAssignment adviceAssignment = adviceAssignmentRepository.findByAdId(adviceRequestList.getAdId()) ;
            Consultative consultative = consultativeRepository.findById(dto.getCId()).get();
            adviceAssignment.updateDoc(consultative);

            adviceAssignmentRepository.save(adviceAssignment);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    /*
    상세페이지 조회
     */

    public AdDetailDto adDetailDto(Long adId){
        AdviceRequestList adviceRequestList = adviceRequestListRepository.findById(adId).get();
        Client client = adviceRequestList.getClient();


        AdDetailDto adDetailDto = AdDetailDto.builder()
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
                .uId(client.getUId())
                .userAddress(client.getUserAddress())
                .userPhone(client.getUserPhone())
                .userTel(client.getUserTel())
                .uName(client.getUName())
                .hospital(adviceRequestList.getDiagnosisRecords().get(0).getHospital())
                .admStart(adviceRequestList.getDiagnosisRecords().get(0).getAdmStart())
                .admEnd(adviceRequestList.getDiagnosisRecords().get(0).getAdmEnd())
                .visitStart(adviceRequestList.getDiagnosisRecords().get(0).getVisitStart())
                .visitEnd(adviceRequestList.getDiagnosisRecords().get(0).getVisitEnd())
                .treatCmt(adviceRequestList.getDiagnosisRecords().get(0).getTreatCmt())
                .diagRound(adviceRequestList.getDiagnosisRecords().get(0).getDiagRound())
//                .adQuestionContent(allAdQuestionContents)
//                .adAnswerContent(adviceRequestList.getAdviceQuestions().get(0).getAdAnswerContent())


                .build();
        return adDetailDto;
    }
}