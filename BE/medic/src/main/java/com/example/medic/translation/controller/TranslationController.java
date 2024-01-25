package com.example.medic.translation.controller;

import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.translation.dto.TranslationRequestDto;
import com.example.medic.translation.service.TranslationFileService;
import com.example.medic.translation.service.TranslationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class TranslationController {

    private final TranslationServiceImpl translationServiceImpl;
    private final TranslationFileService translationFileService;
    /**
     * @return 번역 의뢰 신청 저장
     */
    public ResponseEntity<String> saveTranslationRequest(@RequestPart(name = "files", required = false) List<MultipartFile> multipartFiles,
                                                         @RequestPart(name = "dto") TranslationRequestDto translationRequestDto,
                                                         HttpServletRequest request) throws IOException {
        HttpSession session = request.getSession();
        String findUId = (String) session.getAttribute("uId");

        ClientInfoDto clientInfoDto = ClientInfoDto.builder()
                .uId(findUId)
                .build();
        if (translationServiceImpl.saveTranslationRequest(translationRequestDto, clientInfoDto, multipartFiles)) {
            return ResponseEntity.ok().body("번역 의뢰 신청 저장 성공");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("번역 의뢰 신청 저장 실패");
    }

    /**
     * @return 번역의뢰 파일 조회
     */
    @GetMapping("translation/findrequestfile/{trId}/{filename}")
    public ResponseEntity<?> findTranslationFile(@PathVariable Long trId, @PathVariable String filename) {
        try {
            Resource fileResource = translationFileService.findTranslationFile(trId, filename);
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
