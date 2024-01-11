package com.example.medic.manager.controller;

import com.example.medic.manager.dto.ManagedConsultativeInfoDto;
import com.example.medic.manager.service.ConsultativeManagementServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

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

}
