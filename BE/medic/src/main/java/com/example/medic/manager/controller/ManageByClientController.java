package com.example.medic.manager.controller;

import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.ClientInfoAllDto;
import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.manager.dto.ManagedClientInfoDto;
import com.example.medic.manager.service.ClientManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

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

    /**
     * 관리자 일반 회원 상세 조회
     */
    public ResponseEntity<ManagedClientInfoDto> findDetailByClient(@RequestBody ClientInfoAllDto requestClientInfo) {
        String uId = requestClientInfo.getUId();
        if (uId == null || uId.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        ManagedClientInfoDto responseClientInfoDto = clientManagementService.findDetailByClient(uId);
        return ResponseEntity.ok(responseClientInfoDto);
    }

}
