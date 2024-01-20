package com.example.medic.qna.dto;

import com.example.medic.client.domain.Client;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
public class QnaResponseDto {
    private Long qaId;
    private Date qaDate;
    private String qaTitle;     // QNA 제목
    private String qaQuestion;      // QNA 본문 내용
    private boolean qaSecret;
    private String qaPw;
    private String uId;

    @Builder
    QnaResponseDto(Long qaId, Date qaDate, String qaTitle, String qaQuestion, boolean qaSecret, String qaPw, String uId){
        this.qaDate = qaDate;
        this.qaTitle = qaTitle;
        this.qaQuestion = qaQuestion;
        this.qaSecret = qaSecret;
        this.qaPw = qaPw;
        this.uId = uId;
    }
}
