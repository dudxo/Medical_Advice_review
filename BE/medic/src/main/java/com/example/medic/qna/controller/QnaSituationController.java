package com.example.medic.qna.controller;

import com.example.medic.qna.service.QnaSituationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequiredArgsConstructor
public class QnaSituationController {

    private final QnaSituationService qnaSituationService;
    @GetMapping("/mypage/myCustomerInquiry")
    public ResponseEntity<Integer> getCustomerInquiryCount(HttpServletRequest request){
        HttpSession session = request.getSession();
        String currentUid = (String) session.getAttribute("uId");

        if (currentUid == null) {
            // 세션에 사용자 ID가 없으면 세션이 유효하지 않음
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        try {
            // AdviceRequestService를 통해 자문의뢰 건수 조회
            int qnaCount = qnaSituationService.getQnaCount(currentUid);
            return ResponseEntity.ok(qnaCount);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
