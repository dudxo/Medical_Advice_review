package com.example.medic.qna.service;

import com.example.medic.client.domain.Client;
import com.example.medic.client.repository.ClientRepository;
import com.example.medic.qna.domain.Qna;
import com.example.medic.qna.dto.QnaDto;
import com.example.medic.qna.repository.QnaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QnaService {
    private final QnaRepository qnaRepository;
    private final ClientRepository clientRepository;
    //문의건수 조회
    public int getQnaCount(String uid) {
        try {
            return qnaRepository.findByClient_UId(uid);

        } catch (Exception e) {
            throw new RuntimeException("문의 건수 조회 중 오류 발생");
        }
    }

    //문의 게시글 저장
    public Qna saveQPost(String currentUid, QnaDto qnaDto){
        Client client = clientRepository.findByUId(currentUid).orElse(null);
        Qna qna = Qna.builder()
                .qaDate(qnaDto.getQaDate())
                .qaTitle(qnaDto.getQaTitle())
                .qaSecret(qnaDto.isQaSecret())
                .qaPw(qnaDto.getQaPw())
                .qaQuestion(qnaDto.getQaQuestion())
                .client(client)
                .build();

        return qnaRepository.save(qna);
    }
}
