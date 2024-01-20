package com.example.medic.qna.service;

import com.example.medic.client.domain.Client;
import com.example.medic.client.repository.ClientRepository;
import com.example.medic.qna.domain.Qna;
import com.example.medic.qna.dto.QnaRequestDto;
import com.example.medic.qna.dto.QnaResponseDto;
import com.example.medic.qna.repository.QnaAnswerRepository;
import com.example.medic.qna.repository.QnaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QnaService {
    private final QnaRepository qnaRepository;
    private final ClientRepository clientRepository;
    private final QnaAnswerRepository qnaAnswerRepository;

    //문의건수 조회
    public int getQnaCount(String uid) {
        try {
            return qnaRepository.findByClient_UId(uid);

        } catch (Exception e) {
            throw new RuntimeException("문의 건수 조회 중 오류 발생");
        }
    }

    //문의 게시글 목록 불러오기
    public List<Qna> findQPostAll() {
        return qnaRepository.findAll();
    }

    //문의 게시글 상세조회
    public QnaResponseDto findQPost(Long qaId) {
        Qna qna = qnaRepository.findById(qaId).get();
        String uId = qnaRepository.findUserIdByQaId(qaId).get();

        QnaResponseDto qnaResponseDto = QnaResponseDto.builder()
                .qaId(qna.getQaId())
                .qaDate(qna.getQaDate())
                .qaTitle(qna.getQaTitle())
                .qaSecret(qna.isQaSecret())
                .qaPw(qna.getQaPw())
                .qaQuestion(qna.getQaQuestion())
                .uId(uId)
                .build();

        return qnaResponseDto;
    }

    //문의 게시글 저장
    public Qna saveQPost(String currentUid, QnaRequestDto qnaRequestDto) {
        Client client = clientRepository.findByUId(currentUid).orElse(null);
        Qna qna = Qna.builder()
                .qaDate(qnaRequestDto.getQaDate())
                .qaTitle(qnaRequestDto.getQaTitle())
                .qaSecret(qnaRequestDto.isQaSecret())
                .qaPw(qnaRequestDto.getQaPw())
                .qaQuestion(qnaRequestDto.getQaQuestion())
                .client(client)
                .build();

        return qnaRepository.save(qna);
    }

    //문의 게시글 수정
    public Qna updateQPost(Long qaid, String currentUid, QnaRequestDto qnaRequestDto){
        Qna qna = qnaRepository.findById(qaid).get();
        Client client = clientRepository.findByUId(currentUid).orElse(null);
        if(qna == null){
            throw new IllegalArgumentException("등록된 게시물이 없습니다.");
        }
        Qna updateQna = qna.builder()
                .qaId(qna.getQaId())
                .qaDate(qnaRequestDto.getQaDate())
                .qaTitle(qnaRequestDto.getQaTitle())
                .qaSecret(qnaRequestDto.isQaSecret())
                .qaPw(qnaRequestDto.getQaPw())
                .qaQuestion(qnaRequestDto.getQaQuestion())
                .client(client)
                .build();
        return qnaRepository.save(updateQna);
    }

    public String deleteQpost(Long qaid){
        Long qaAnswerId = qnaAnswerRepository.findAnswerIdByQaId(qaid).orElse(null);
        if(qaAnswerId == null){
            qnaRepository.deleteById(qaid);
            return "삭제되었습니다.";
        }
        qnaAnswerRepository.deleteById(qaAnswerId);
        qnaRepository.deleteById(qaid);
        return "삭제되었습니다.";
    }
}
