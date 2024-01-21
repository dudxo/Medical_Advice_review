package com.example.medic.advice.controller;

import com.example.medic.advice.domain.AdviceFile;
import com.example.medic.advice.dto.AllAdviceRequestDto;
import com.example.medic.advice.repository.AdviceFileRepository;
import com.example.medic.advice.repository.AdviceRequestListRepository;
import com.example.medic.advice.service.AdviceFileService;
import com.example.medic.advice.service.AdviceService;
import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.files.handler.FileHandler;
import lombok.AllArgsConstructor;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

    @GetMapping("/advice/findrequestfile/{adId}")
    public ResponseEntity<?> findAdviceRequestFile(@PathVariable Long adId, @RequestBody String filetype) {
        try {
            UrlResource fileResource = adviceFileService.findAdviceRequestFile(adId, filetype);

            if (fileResource != null && fileResource.exists()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileResource.getFilename())
                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                        .body(fileResource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Handle exceptions appropriately (e.g., log the error)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

