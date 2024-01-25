package com.example.medic.translation.service;

import com.example.medic.translation.domain.TranslationRequestFile;
import com.example.medic.translation.repository.TranslationRequestFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class TranslationFileService {
    private final TranslationRequestFileRepository translationRequestFileRepository;
    public Resource findTranslationFile(Long trId, String fileType) throws MalformedURLException {
        Long fileId = translationRequestFileRepository.findByFileId(trId);
        TranslationRequestFile translationRequestFile = translationRequestFileRepository.findById(fileId)
                .orElseThrow(() -> new NoSuchElementException("AdviceFile not found with id: " + fileId));

        if (translationRequestFile != null) {
            String baseUrl = "file:" + System.getProperty("user.dir") + "/medic/src/main/resources/static/file/translationrequest/";
            try {
                Resource resource = new UrlResource(baseUrl + translationRequestFile.getTrMtl());
                return resource;
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid file type: " + fileType);
            }
        }
        return null;
    }
}

