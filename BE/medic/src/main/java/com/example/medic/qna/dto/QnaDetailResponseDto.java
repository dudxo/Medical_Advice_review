package com.example.medic.qna.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
public class QnaDetailResponseDto {
    private Long qaId;
    private Date qaDate;
    private String qaTitle;     // QNA 제목
    private String qaQuestion;      // QNA 본문 내용
    private String qaPw;
    private boolean qaSecret;
    private String uId;

    @Builder
    QnaDetailResponseDto(Long qaId, Date qaDate, String qaTitle, String qaQuestion, boolean qaSecret, String uId, String qaPw){
        this.qaId = qaId;
        this.qaDate = qaDate;
        this.qaTitle = qaTitle;
        this.qaPw = qaPw;
        this.qaQuestion = qaQuestion;
        this.qaSecret = qaSecret;
        this.uId = uId;
    }
}
