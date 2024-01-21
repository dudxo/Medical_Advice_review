package com.example.medic.advice.service;

import com.example.medic.advice.domain.AdviceFile;
import com.example.medic.advice.repository.AdviceFileRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.net.MalformedURLException;

@Service
@Slf4j
@AllArgsConstructor
public class AdviceFileService {
    private AdviceFileRepository adviceFileRepository;

    public UrlResource findAdviceRequestFile(Long adId, String filetype) throws MalformedURLException {
        Long fid = adviceFileRepository.findByFileId(adId);
        AdviceFile adviceFile = adviceFileRepository.findById(fid).get();
        if (filetype == "adReqForm") {
            UrlResource urlResource = new UrlResource(adviceFile.getAdReqForm());
            return urlResource;
        } else if (filetype == "adDiagnosis") {
            UrlResource urlResource = new UrlResource(adviceFile.getAdDiagnosis());
            return urlResource;
        } else if (filetype == "adRecord") {
            UrlResource urlResource = new UrlResource(adviceFile.getAdRecord());
            return urlResource;
        } else if (filetype == "adFilm") {
            UrlResource urlResource = new UrlResource(adviceFile.getAdFilm());
            return urlResource;
        }
        return null;
    }
}
