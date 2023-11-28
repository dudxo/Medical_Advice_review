package com.example.medic.advice.service;

import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.advice.dto.AdviceSituationDto;
import com.example.medic.advice.repository.AdviceAssignmentRepository;
import com.example.medic.advice.repository.AdviceQuestionRepository;
import com.example.medic.advice.repository.AdviceRequestListRepository;
import com.example.medic.client.dto.ClientInfoDto;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@AllArgsConstructor
public class AdviceSituationService {

    private final AdviceRequestListRepository adviceRequestListRepository;
    private final AdviceAssignmentRepository adviceAssignmentRepository;
    private final AdviceQuestionRepository adviceQuestionRepository;

    public List<AdviceSituationDto> getAdviceSituationList(String adPtSub, String adPtDiagnosis,
                                                           Date adRegDate, ClientInfoDto clientInfoDto) {
        try {
            String uid = clientInfoDto.getUId();

            List<AdviceRequestList> requestList = adviceRequestListRepository.findByClient_UId(uid);

            return requestList.stream()
                    .map(AdviceSituationDto::from)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("AdviceSituationList 조회 중 오류 발생", e);
        }
    }
}
