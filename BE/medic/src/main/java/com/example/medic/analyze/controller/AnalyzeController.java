package com.example.medic.analyze.controller;

import com.example.medic.analyze.dto.AnalyzeRequestDto;
import com.example.medic.analyze.service.AnalyzeFileService;
import com.example.medic.analyze.service.AnalyzeServiceImpl;
import com.example.medic.client.dto.ClientInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class AnalyzeController {

    private final AnalyzeServiceImpl analyzeService;
    private final AnalyzeFileService analyzeFileService;
    /**
     * @return 분석 의뢰 저장
     */

    public ResponseEntity<String> saveAnalyzeRequest(@RequestPart(name = "files", required = false) List<MultipartFile> multipartFiles,
                                                     @RequestPart(name = "dto") AnalyzeRequestDto analyzeRequestDto,
                                                     HttpServletRequest request) throws IOException {
        HttpSession session = request.getSession();
        String findUId = (String) session.getAttribute("uId");

        ClientInfoDto clientInfoDto = ClientInfoDto.builder()
                .uId(findUId)
                .build();
        if (analyzeService.saveAnalyzeRequest(analyzeRequestDto, clientInfoDto, multipartFiles)) {
            return ResponseEntity.ok().body("분석 의뢰 신청 저장 성공");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed");
    }

    /**
     * @return 분석의뢰 파일 조회
     */
    @GetMapping("analyze/findrequestfile/{anId}/{filename}")
    public ResponseEntity<?> findAnalyzeFile(@PathVariable Long anId, @PathVariable String filename) {
        try {
            Resource fileResource = analyzeFileService.findAnalyzeRequestFile(anId, filename);
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
