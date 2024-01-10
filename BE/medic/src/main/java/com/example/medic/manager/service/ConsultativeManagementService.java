package com.example.medic.manager.controller;

import com.example.medic.manager.dto.ManagedConsultativeInfoDto;

import java.util.List;

public interface ConsultativeManagementService {

    /**
     * @return 전체 전문의 목록 조회
     */
    List<ManagedConsultativeInfoDto> findAllConsultative();

    /**
     * @return 특정 전문의 상세 조회
     */
    ManagedConsultativeInfoDto viewDoctorManagementDetails(Long cId);

    /**
     * @return 특정 전문의 정보 수정
     */
    boolean updateDoctorManagement(ManagedConsultativeInfoDto managedConsultativeInfoDto);

    /**
     * @return 특정 전문의 삭제
     */
    boolean deleteDoctorManagement(ManagedConsultativeInfoDto managedConsultativeInfoDto);
}
