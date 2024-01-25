package com.example.medic.advice.service;

import com.example.medic.advice.domain.AdviceAssignment;
import com.example.medic.advice.domain.AdviceQuestion;
import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.advice.dto.AdviceAssignmentDto;
import com.example.medic.advice.dto.AdviceSituationDto;
import com.example.medic.advice.repository.AdviceAssignmentRepository;
import com.example.medic.advice.repository.AdviceQuestionRepository;
import com.example.medic.advice.repository.AdviceRequestListRepository;
import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.consultative.domain.Consultative;
import com.example.medic.manager.dto.AdviceListDto;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@AllArgsConstructor
public class AdviceSituationService {

    private final AdviceRequestListRepository adviceRequestListRepository;
    private final AdviceAssignmentRepository adviceAssignmentRepository;
    private final AdviceQuestionRepository adviceQuestionRepository;

    public List<AdviceSituationDto> getAdviceSituationList(ClientInfoDto clientInfoDto) {
        try {
            String uid = clientInfoDto.getUId();

            List<AdviceRequestList> adviceRequestLists = adviceRequestListRepository.findByClient_UId(uid);
            Map<Long, AdviceSituationDto> adviceSituationDtoMap = new HashMap<>();

            for (AdviceRequestList adviceRequestList : adviceRequestLists) {
                List<AdviceQuestion> adviceQuestions = adviceRequestList.getAdviceQuestions();

                for (AdviceQuestion adviceQuestion : adviceQuestions) {
                    AdviceSituationDto adviceSituationDto = convertToDTO(adviceRequestList, adviceQuestion);

                    if (!adviceSituationDtoMap.containsKey(adviceSituationDto.getAdId())) {
                        adviceSituationDtoMap.put(adviceSituationDto.getAdId(), adviceSituationDto);
                    }
                }
            }
            return new ArrayList<>(adviceSituationDtoMap.values());
        } catch (Exception e) {
            throw new RuntimeException("AdviceRequestList 목록 조회 중 오류 발생");
        }
    }

    private AdviceSituationDto convertToDTO(AdviceRequestList adviceRequestList, AdviceQuestion adviceQuestion) {
        String admProgressStatus = null;

        Optional<AdviceAssignment> adviceAssignmentOptional = Optional.ofNullable(adviceRequestList.getAdviceAssignment());

        if (adviceAssignmentOptional.isPresent()) {
            AdviceAssignment adviceAssignment = adviceAssignmentOptional.get();
            admProgressStatus = adviceAssignment.getAdmProgressStatus();
        }

        Consultative consultative = adviceAssignmentOptional.map(AdviceAssignment::getConsultative).orElse(null);

        return new AdviceSituationDto(adviceRequestList.getAdId(), adviceRequestList.getAdPtSub(),
                adviceRequestList.getAdPtDiagnosis(), adviceRequestList.getAdRegDate(),
                (adviceAssignmentOptional.map(AdviceAssignment::getAdmDate).orElse(null)),
                adviceQuestion.getAdAnswerDate(), admProgressStatus);
    }


    public int getAdviceCount(String uid) {
        try {
            List<AdviceRequestList> adviceRequestList = adviceRequestListRepository.findByClient_UId(uid);

            return adviceRequestList.size();
        } catch (Exception e) {
            throw new RuntimeException("AdviceRequestList 건수 조회 중 오류 발생");
        }
    }
}
