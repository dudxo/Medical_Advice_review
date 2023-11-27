package com.example.medic.advice.controller;

import com.example.medic.advice.dto.AllAdviceRequestDto;
import com.example.medic.advice.service.AdviceService;
import com.example.medic.client.dto.ClientInfoDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@AllArgsConstructor
public class AdviceController {

    private final AdviceService adviceService;

    @PostMapping("/advice/request")
    public ResponseEntity<String> saveAdviceRequest(@RequestBody AllAdviceRequestDto allAdviceRequestDto,
                                                    HttpServletRequest request) {
        HttpSession session = request.getSession();
        String uid = (String) session.getAttribute("uId");

        ClientInfoDto clientInfoDto = ClientInfoDto.builder()
                .uId(uid)
                .build();
        if (adviceService.saveAdviceRequest(allAdviceRequestDto, clientInfoDto)) {
          return  ResponseEntity.ok().body("saved");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed");
    }
}
