package com.example.medic.translation.controller;

import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.translation.dto.TranslationRequestDto;
import com.example.medic.translation.service.TranslationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequiredArgsConstructor
public class TranslationController {

    private final TranslationServiceImpl translationServiceImpl;

    /**
     * @return 번역 의뢰 신청 저장
     */
    public ResponseEntity<String> saveTranslationRequest(@RequestBody TranslationRequestDto translationRequestDto,
                                                         HttpServletRequest request) {
        HttpSession session = request.getSession();
        String findUId = (String) session.getAttribute("uId");

        ClientInfoDto clientInfoDto = ClientInfoDto.builder()
                .uId(findUId)
                .build();
        if (translationServiceImpl.saveTranslationRequest(translationRequestDto, clientInfoDto)) {
            return ResponseEntity.ok().body("번역 의뢰 신청 저장 성공");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("번역 의뢰 신청 저장 실패");
    }
}
