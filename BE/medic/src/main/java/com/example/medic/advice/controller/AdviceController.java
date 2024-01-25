package com.example.medic.advice.controller;

import com.example.medic.advice.dto.AllAdviceRequestDto;
import com.example.medic.advice.service.AdviceFileService;
import com.example.medic.advice.service.AdviceService;
import com.example.medic.client.dto.ClientInfoDto;

import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@RestController
@AllArgsConstructor
public class AdviceController {

    private final AdviceService adviceService;
    private final AdviceFileService adviceFileService;

    @PostMapping("/advice/request")
    public ResponseEntity<String> saveAdviceRequest(@RequestPart(name = "files", required = false) List<MultipartFile> multipartFiles,
                                                    @RequestPart(name = "dto") AllAdviceRequestDto allAdviceRequestDto,
                                                    HttpServletRequest request) throws IOException {

        HttpSession session = request.getSession();
        String uid = (String) session.getAttribute("uId");

        ClientInfoDto clientInfoDto = ClientInfoDto.builder()
                .uId(uid)
                .build();
        if (adviceService.saveAdviceRequest(allAdviceRequestDto, clientInfoDto, multipartFiles)) {
            return ResponseEntity.ok().body("saved");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed");
    }

    /**
     * 자문의뢰 상세조회
     */
    @GetMapping("/advice/adviceDetail/{adId}")
    public ResponseEntity<AllAdviceRequestDto> findAdviceDetail(@PathVariable Long adId) {
        try {
            AllAdviceRequestDto allAdviceRequestDto = adviceService.getAdviceRequestDetail(adId);
            return ResponseEntity.ok(allAdviceRequestDto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    /**
     * 자문의뢰 파일 조회
     */
    @GetMapping("advice/findrequestfile/{adId}/{filename}")
    public ResponseEntity<?> findAdviceRequestFile(@PathVariable Long adId, @PathVariable String filename) {
        try {
            Resource fileResource = adviceFileService.findAdviceRequestFile(adId, filename);
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

