package com.example.medic.consultative.controller;

import com.example.medic.advice.dto.AdviceSituationDto;
import com.example.medic.advice.dto.AllAdviceRequestDto;
import com.example.medic.analyze.dto.AnalyzeRequestDto;
import com.example.medic.analyze.dto.AnalyzeResponseDto;
import com.example.medic.analyze.dto.AnalyzeSituationDto;
import com.example.medic.consultative.dto.ConsultativeDto;
import com.example.medic.consultative.service.ConsultativeAssignmentServiceImpl;
import com.example.medic.consultative.service.ConsultativeFileService;
import com.example.medic.translation.dto.TranslationRequestDto;
import com.example.medic.translation.dto.TranslationResponseDto;
import com.example.medic.translation.dto.TranslationSituationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

@Controller
@RequiredArgsConstructor
public class ConsultativeController {

    private final ConsultativeAssignmentServiceImpl consultativeAssignmentService;
    private final ConsultativeFileService consultativeFileService;
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

    /**
     * API 미구현
     * @return 배정 번역 의뢰 목록 조회
     */
    public ResponseEntity<List<TranslationSituationDto>> findAssignTranslationList(HttpServletRequest request) {
        HttpSession session = request.getSession();
        String cId = (String) session.getAttribute("uId");

        ConsultativeDto consultativeDto = ConsultativeDto.builder()
                .cId(cId)
                .build();
        try {
            List<TranslationSituationDto> response = consultativeAssignmentService.findAllAssigmentTranslation(consultativeDto);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    /**
     * API 미구현
     * @return 배정 받은 특정 번역 의뢰 상세 조회
     */
    public ResponseEntity<TranslationResponseDto> AssignAnalyzeDetails(@RequestBody TranslationRequestDto translationRequestDto,
                                                                       HttpServletRequest request) {
        HttpSession session = request.getSession();
        String cId = (String) session.getAttribute("uId");

        ConsultativeDto consultativeDto = ConsultativeDto.builder()
                .cId(cId)
                .build();
        try {
            TranslationResponseDto response = consultativeAssignmentService.findAssignmentTranslationDetail(consultativeDto, translationRequestDto);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    /**
     * API 미구현
     * @return 배정 받은 번역 의뢰 답변파일 저장
     */
    public ResponseEntity<String> saveTranslationAnswerFile(@RequestPart(name = "files") List<MultipartFile> multipartFiles,
                                                            @PathVariable Long trId,
                                                            HttpServletRequest request) throws IOException {
        HttpSession session = request.getSession();
        String cId = (String) session.getAttribute("uId");

        ConsultativeDto consultativeDto = ConsultativeDto.builder()
                .cId(cId)
                .build();
        if(consultativeAssignmentService.saveTranslationAnswerFile(consultativeDto, multipartFiles, trId)){
            return ResponseEntity.ok("저장되었습니다.");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed");
    }

    /**
     * API 미구현
     * @return 배정 받은 번역 의뢰 답변파일 조회
     */
    public ResponseEntity<?> findTranslationAnswerFile(@PathVariable Long trId){
        try {
            Resource fileResource = consultativeFileService.findTranslationAnswerFile(trId);
            if (fileResource != null) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileResource.getFilename() + "\"")
                        .body(fileResource);
            } else {
                System.out.println(64);
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}
