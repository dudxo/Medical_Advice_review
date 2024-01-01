package com.example.medic.qna.service;

import com.example.medic.qna.repository.QnaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QnaSituationService {
    private final QnaRepository qnaRepository;

    public int getQnaCount(String uid) {
        try {
            return qnaRepository.findByClient_UId(uid);

        } catch (Exception e) {
            throw new RuntimeException("문의 건수 조회 중 오류 발생");
        }
    }
}
