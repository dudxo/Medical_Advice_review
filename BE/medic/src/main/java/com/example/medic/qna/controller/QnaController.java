package com.example.medic.qna.controller;

import com.example.medic.qna.dto.QnaDto;
import com.example.medic.qna.service.QnaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequiredArgsConstructor
public class QnaController {

    private final QnaService qnaService;
    @GetMapping("/mypage/myCustomerInquiry")
    public ResponseEntity<Integer> getCustomerInquiryCount(HttpServletRequest request){
        HttpSession session = request.getSession();
        String currentUid = (String) session.getAttribute("uId");

        if (currentUid == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        try {
            // AdviceRequestService를 통해 자문의뢰 건수 조회
            int qnaCount = qnaService.getQnaCount(currentUid);
            return ResponseEntity.ok(qnaCount);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/qna/writeqna")
    public ResponseEntity<String> writeQPost(HttpServletRequest request, @RequestBody QnaDto qnaDto){
        HttpSession session = request.getSession();
        String currentUid = (String) session.getAttribute("uId");

        try{
            qnaService.saveQPost(currentUid, qnaDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
