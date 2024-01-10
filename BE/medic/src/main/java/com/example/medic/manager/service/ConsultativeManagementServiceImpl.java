package com.example.medic.manager.service;


import com.example.medic.advice.repository.AdviceAssignmentRepository;
import com.example.medic.advice.repository.AdviceRequestListRepository;
import com.example.medic.analyze.repository.AnalyzeAssignmentRepository;
import com.example.medic.analyze.repository.AnalyzeRequestListRepository;
import com.example.medic.client.domain.Client;
import com.example.medic.consultative.domain.Consultative;
import com.example.medic.consultative.repository.ConsultativeRepository;
import com.example.medic.manager.dto.ManagedConsultativeInfoDto;
import com.example.medic.translation.repository.TranslationAssignmentRepository;
import com.example.medic.translation.repository.TranslationRequestListRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ConsultativeManagementServiceImpl implements ConsultativeManagementService {

    private final AdviceAssignmentRepository adviceAssignmentRepository;
    private final AnalyzeAssignmentRepository analyzeAssignmentRepository;
    private final TranslationAssignmentRepository translationAssignmentRepository;
    private final ConsultativeRepository consultativeRepository;
    private final Logger LOGGER = LoggerFactory.getLogger(ConsultativeManagementServiceImpl.class);

    @Override
    public List<ManagedConsultativeInfoDto> findAllConsultative() {
        List<Consultative> consultatives = consultativeRepository.findAll();
        List<ManagedConsultativeInfoDto> managedConsultativeInfoDtoList = new ArrayList<>();
        for (Consultative consultative : consultatives) {
            ManagedConsultativeInfoDto managedConsultativeInfoDto = ManagedConsultativeInfoDto.builder()
                    .cId(consultative.getCId())
                    .cName(consultative.getCName())
                    .cRole(consultative.getCRole())
                    .cEmail(consultative.getCEmail())
                    .cTel(consultative.getCTel())
                    .countByAdviceAssignment(countByAdvice(consultative))
                    .countByAnalyzeAssignment(countByAnalyze(consultative))
                    .countByTranslateAssignment(countByTranslate(consultative))
                    .build();
            managedConsultativeInfoDtoList.add(managedConsultativeInfoDto);
        }
        return managedConsultativeInfoDtoList;
    }

    @Override
    public ManagedConsultativeInfoDto viewDoctorManagementDetails(String cId) {
        return null;
    }

    @Override
    public boolean updateDoctorManagement(ManagedConsultativeInfoDto managedConsultativeInfoDto) {
        return false;
    }

    @Override
    public boolean deleteDoctorManagement(ManagedConsultativeInfoDto managedConsultativeInfoDto) {
        return false;
    }

    /**
     * 전문의 배정 분석 의뢰 전체 건수 조회
     */
    public int countByAnalyze(Consultative consultative) {
        return analyzeAssignmentRepository.countAllByConsultative(consultative);
    }

    /**
     * 전문의 배정 번역 의뢰 전체 건수 조회
     */
    public int countByTranslate(Consultative consultative) {
        return translationAssignmentRepository.countAllByConsultative(consultative);
    }

    /**
     * 전문의 자문 의뢰 전체 건수 조회
     */
    public int countByAdvice(Consultative consultative) {
        return adviceAssignmentRepository.countAllByConsultative(consultative);
    }
}
