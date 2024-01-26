package com.example.medic.analyze.controller;

import com.example.medic.advice.dto.AllAdviceRequestDto;
import com.example.medic.analyze.dto.AnalyzeRequestDto;
import com.example.medic.analyze.dto.AnalyzeResponseDto;
import com.example.medic.analyze.service.AnalyzeServiceImpl;
import com.example.medic.client.dto.ClientInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequiredArgsConstructor
public class AnalyzeController {

    private final AnalyzeServiceImpl analyzeService;

    /**
     * @return 분석 의뢰 저장
     */

    @PostMapping("/analyze/request")
    public ResponseEntity<String> saveAnalyzeRequest(@RequestBody AnalyzeRequestDto analyzeRequestDto,
                                                     HttpServletRequest request) {
        HttpSession session = request.getSession();
        String findUId = (String) session.getAttribute("uId");

        ClientInfoDto clientInfoDto = ClientInfoDto.builder()
                .uId(findUId)
                .build();
        if (analyzeService.saveAnalyzeRequest(analyzeRequestDto, clientInfoDto)) {
            return ResponseEntity.ok().body("분석 의뢰 신청 저장 성공");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed");
    }

    /**
     * 분석의뢰 상세조회
     */
    @GetMapping("/analyze/analyzeDetail/{anId}")
    public ResponseEntity<AnalyzeResponseDto> findAnalyzeDetail(@PathVariable Long anId){
        try{
            AnalyzeResponseDto analyzeResponseDto = analyzeService.getAnalyzeRequestDetail(anId);
            return ResponseEntity.ok(analyzeResponseDto);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }
}
