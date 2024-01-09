package com.example.medic.manager.controller;

import com.example.medic.manager.dto.ManagedClientInfoDto;
import com.example.medic.manager.service.ClientManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ManageByClientController {

    private final ClientManagementService clientManagementService;


    /**
     * 일반 회원 목록 조회
     */
    public ResponseEntity<List<ManagedClientInfoDto>> findAllClient() {
        List<ManagedClientInfoDto> response = clientManagementService.findAllClient();
        if (response == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.ok(response);
    }

}
