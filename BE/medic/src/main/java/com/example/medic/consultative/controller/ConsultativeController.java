package com.example.medic.consultative.controller;

import com.example.medic.advice.dto.AdviceSituationDto;
import com.example.medic.advice.dto.AllAdviceRequestDto;
import com.example.medic.analyze.dto.AnalyzeRequestDto;
import com.example.medic.analyze.dto.AnalyzeResponseDto;
import com.example.medic.analyze.dto.AnalyzeSituationDto;
import com.example.medic.consultative.dto.ConsultativeDto;
import com.example.medic.consultative.service.ConsultativeAssignmentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.NoSuchElementException;

@Controller
@RequiredArgsConstructor
public class ConsultativeController {

    private final ConsultativeAssignmentServiceImpl consultativeAssignmentService;

    /**
     * API 미구현
     * @return 배정 자문 의뢰 목록 조회
     */
    public ResponseEntity<List<AdviceSituationDto>> findAssignAdviceList(HttpServletRequest request) {
        HttpSession session = request.getSession();
        String cId = (String) session.getAttribute("uId");

        ConsultativeDto consultativeDto = ConsultativeDto.builder()
                .cId(cId)
                .build();
        List<AdviceSituationDto> response = consultativeAssignmentService.findAllAssigmentAdvice(consultativeDto);
        return ResponseEntity.ok(response);
    }

    /**
     * API 미구현
     * @return 배정 받은 특정 자문 의뢰 상세 조회
     */
    public ResponseEntity<AllAdviceRequestDto> AssignAdviceDetails(@RequestBody AllAdviceRequestDto allAdviceRequestDto,
                                                                   HttpServletRequest request) {
        HttpSession session = request.getSession();
        String cId = (String) session.getAttribute("uId");

        ConsultativeDto consultativeDto = ConsultativeDto.builder()
                .cId(cId)
                .build();
        try {
            AllAdviceRequestDto response = consultativeAssignmentService.findAssigmentAdviceDetail(consultativeDto, allAdviceRequestDto);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    /**
     * API 미구현
     * @return 배정 분석 의뢰 목록 조회
     */
    public ResponseEntity<List<AnalyzeSituationDto>> findAssignAnalyzeList(HttpServletRequest request) {
        HttpSession session = request.getSession();
        String cId = (String) session.getAttribute("uId");

        ConsultativeDto consultativeDto = ConsultativeDto.builder()
                .cId(cId)
                .build();
        try {
            List<AnalyzeSituationDto> response = consultativeAssignmentService.findAllAssigmentAnalyze(consultativeDto);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    /**
     * API 미구현
     * @return 배정 받은 특정 분석 의뢰 상세 조회
     */
    public ResponseEntity<AnalyzeResponseDto> AssignAnalyzeDetails(@RequestBody AnalyzeRequestDto allAdviceRequestDto,
                                                                   HttpServletRequest request) {
        HttpSession session = request.getSession();
        String cId = (String) session.getAttribute("uId");

        ConsultativeDto consultativeDto = ConsultativeDto.builder()
                .cId(cId)
                .build();
        try {
            AnalyzeResponseDto response = consultativeAssignmentService.findAssignmentAnalyzeDetail(consultativeDto, allAdviceRequestDto);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
