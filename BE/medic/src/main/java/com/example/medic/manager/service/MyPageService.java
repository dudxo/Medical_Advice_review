package com.example.medic.manager.service;

import com.example.medic.advice.repository.AdviceRequestListRepository;
import com.example.medic.analyze.repository.AnalyzeRequestListRepository;
import com.example.medic.qna.repository.QnaRepository;
import com.example.medic.translation.repository.TranslationRequestListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyPageService {
    private final QnaRepository qnaRepository;
    private final AdviceRequestListRepository adviceRequestListRepository;
    private final AnalyzeRequestListRepository analyzeRequestListRepository;
    private final TranslationRequestListRepository translationRequestListRepository;

    public Long getQnaCount(){
        long qnaCount = qnaRepository.count();
        return qnaCount;
    }

    public Long getAdviceCount(){
        long adviceCount = adviceRequestListRepository.count();
        return adviceCount;
    }
    public Long getAnalyzeCount(){
        long analyzeCount = analyzeRequestListRepository.count();
        return analyzeCount;
    }
    public Long getTranslateCount(){
        long translateCount = translationRequestListRepository.count();
        return translateCount;
    }
}
