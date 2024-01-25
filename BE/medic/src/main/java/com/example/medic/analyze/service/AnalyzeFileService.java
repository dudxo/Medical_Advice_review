package com.example.medic.analyze.service;

import com.example.medic.advice.domain.AdviceFile;
import com.example.medic.analyze.domain.AnalyzeRequestFile;
import com.example.medic.analyze.repository.AnalyzeRequestFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class AnalyzeFileService {
    private final AnalyzeRequestFileRepository analyzeRequestFileRepository;

    public Resource findAdviceRequestFile(Long anId, String fileType) throws MalformedURLException {
        Long fileId = analyzeRequestFileRepository.findByFileId(anId);
        AnalyzeRequestFile analyzeRequestFile = analyzeRequestFileRepository.findById(fileId)
                .orElseThrow(() -> new NoSuchElementException("AdviceFile not found with id: " + fileId));

        if (analyzeRequestFile != null) {
            String baseUrl = "file:" + System.getProperty("user.dir") + "/medic/src/main/resources/static/file/analyzerequest/";
            Resource resource = null;
            switch (fileType) {
                case "anReqForm":
                    resource = new UrlResource(baseUrl + analyzeRequestFile.getAnReqForm());
                    return resource;
                case "anDiagnosis":
                    resource = new UrlResource(baseUrl + analyzeRequestFile.getAnDiagnosis());
                    return resource;
                case "anRecord":
                    resource = new UrlResource(baseUrl + analyzeRequestFile.getAnRecord());
                    return resource;
                case "anFilm":
                    resource = new UrlResource(baseUrl + analyzeRequestFile.getAnFilm());
                    return resource;
                case "anOther":
                    resource = new UrlResource(baseUrl + analyzeRequestFile.getAnOther());
                    return resource;
                default:
                    throw new IllegalArgumentException("Invalid file type: " + fileType);
            }
        }
        return null;
    }

}
