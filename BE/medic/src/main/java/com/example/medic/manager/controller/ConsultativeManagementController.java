package com.example.medic.manager.controller;

import com.example.medic.manager.dto.ManagedClientInfoDto;
import com.example.medic.manager.dto.ManagedConsultativeInfoDto;
import com.example.medic.manager.service.ConsultativeManagementServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ConsultativeManagementController {

    private final ConsultativeManagementServiceImpl consultativeManagementService;

    /**
     * @return 전문의 목록 조회
     */
    public ResponseEntity<List<ManagedConsultativeInfoDto>> findAllConsultative() {
        List<ManagedConsultativeInfoDto> response = consultativeManagementService.findAllConsultative();
        if (response == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.ok(response);
    }

    /**
     * @return 관지라 특정 전문의 상세 조회
     */
    public ResponseEntity<ManagedConsultativeInfoDto> findDetailByConsultative(@RequestBody ManagedConsultativeInfoDto managedConsultativeInfoDto) {
        String cId = managedConsultativeInfoDto.getCId();
        if (cId == null || cId.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        ManagedConsultativeInfoDto responseConsultativeInfoDto = consultativeManagementService.viewDoctorManagementDetails(cId);
        return ResponseEntity.ok(responseConsultativeInfoDto);
    }

    /**
     * @return 관리자 특정 전문의 정보 수정
     */
    public ResponseEntity<String> updateConsultativeInfo(@RequestBody ManagedConsultativeInfoDto managedConsultativeInfoDto) {
        if (!consultativeManagementService.updateDoctorManagement(managedConsultativeInfoDto)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.ok("전문의 정보 수정 완료");
    }
}
