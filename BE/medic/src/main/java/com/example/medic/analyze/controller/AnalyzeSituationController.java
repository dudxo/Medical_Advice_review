package com.example.medic.analyze.controller;

import com.example.medic.analyze.service.AnalyzeSituationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@AllArgsConstructor
public class AnalyzeSituationController {

    private final AnalyzeSituationService analyzeSituationService;

    @GetMapping("mypage/myAnalyzeSituation")
    public ResponseEntity<Integer> getAnalyzeCount(HttpServletRequest request) {
        HttpSession session = request.getSession();
        String currentUid = (String) session.getAttribute("uId");

        if (currentUid == null) {
            // 세션에 사용자 ID가 없으면 세션이 유효하지 않음
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        try {
            // AdviceRequestService를 통해 자문의뢰 건수 조회
            int analyzeRequestCount = analyzeSituationService.getAnalyzeCount(currentUid);
            return ResponseEntity.ok(analyzeRequestCount);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
