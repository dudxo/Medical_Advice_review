package com.example.medic.qna.dto;
import com.example.medic.client.domain.Client;
import com.example.medic.qna.domain.Qna;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class QnaDto {
    private Date qaDate;
    private String qaTitle;     // QNA 제목
    private String qaQuestion;      // QNA 본문 내용
    private boolean qaSecret;
    private String qaPw;
    private Client client;

    public static QnaDto form(Qna qna){
        return QnaDto.builder()
                .qaDate(qna.getQaDate())
                .qaTitle(qna.getQaTitle())
                .qaQuestion(qna.getQaQuestion())
                .qaSecret(qna.isQaSecret())
                .qaPw(qna.getQaPw())
                .client(qna.getClient())
                .build();
    }
}
