package com.example.medic.advice.service;

import com.example.medic.advice.domain.AdviceFile;
import com.example.medic.advice.dto.AdviceFileResponseDto;
import com.example.medic.advice.repository.AdviceFileRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.stereotype.Service;

import java.io.File;
import java.net.MalformedURLException;
import java.util.NoSuchElementException;

@Service
@Slf4j
@AllArgsConstructor
public class AdviceFileService {
    private AdviceFileRepository adviceFileRepository;

    //요청 file 조회
    public Resource findAdviceRequestFile(Long adId, String fileType) throws MalformedURLException {
        Long fileId = adviceFileRepository.findByFileId(adId);
        AdviceFile adviceFile = adviceFileRepository.findById(fileId)
                .orElseThrow(() -> new NoSuchElementException("AdviceFile not found with id: " + fileId));
        
        if (adviceFile != null) {
            String baseUrl = "file:" + System.getProperty("user.dir") + "/medic/src/main/resources/static/file/advicerequest/";
            Resource resource = null;
            switch (fileType) {
                case "adReqForm":
                    resource = new UrlResource(baseUrl + adviceFile.getAdReqForm());
                    return resource;
                case "adDiagnosis":
                    resource = new UrlResource(baseUrl + adviceFile.getAdDiagnosis());
                    return resource;
                case "adRecord":
                    resource = new UrlResource(baseUrl + adviceFile.getAdRecord());
                    return resource;
                case "adFilm":
                    resource = new UrlResource(baseUrl + adviceFile.getAdFilm());
                    return resource;
                default:
                    throw new IllegalArgumentException("Invalid file type: " + fileType);
            }
        }
        return null;
    }
}
