package com.example.medic.advice.controller;

import com.example.medic.advice.dto.AllAdviceRequestDto;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class AdviceController {

    private final AdviceService adviceService;

    @PostMapping("/advice/request")
    public ResponseEntity<String> saveAdviceRequest(@RequestBody AllAdviceRequestDto allAdviceRequestDto) {
        String result = adviceService.saveAdviceReqeust(allAdviceRequestDto);
    }
}
