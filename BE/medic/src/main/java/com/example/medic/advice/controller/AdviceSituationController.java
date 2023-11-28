package com.example.medic.advice.controller;

import com.example.medic.advice.dto.AdviceSituationDto;
import com.example.medic.advice.dto.AllAdviceRequestDto;
import com.example.medic.advice.service.AdviceSituationService;
import com.example.medic.client.dto.ClientInfoDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

@RestController
@AllArgsConstructor
public class AdviceSituationController {

    private final AdviceSituationService adviceSituationService;

    @GetMapping("/advice/list")
    public ResponseEntity<List<AdviceSituationDto>> getAdviceSituationList(
            @RequestParam(name = "adPtSub", required = false) String adPtSub,
            @RequestParam(name = "adPtDiagnosis", required = false) String adPtDiagnosis,
            @RequestParam(name = "adRegDate", required = false) Date adRegDate,
            HttpServletRequest request) {

        HttpSession session = request.getSession();
        String uid = (String) session.getAttribute("uId");

        ClientInfoDto clientInfoDto = ClientInfoDto.builder()
                .uId(uid)
                .build();
        try {
            List<AdviceSituationDto> adviceList = adviceSituationService.getAdviceSituationList(adPtSub, adPtDiagnosis, adRegDate, clientInfoDto);
            return ResponseEntity.ok(adviceList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}