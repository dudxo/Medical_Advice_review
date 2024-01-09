package com.example.medic.manager.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ManagedClientInfoDto {

    private String uId;

    private String uRole;

    private String uName;

    private String uEmail;

    private String userTel;

    private int countByAdvice;

    private int countByAnalyze;

    private int countByTranslate;

    @Builder
    ManagedClientInfoDto(String uId, String uRole, String uName, String uEmail,
                         String userTel, int countByAdvice, int countByAnalyze,
                         int countByTranslate) {
        this.uId = uId;
        this.uRole = uRole;
        this.uName = uName;
        this.uEmail = uEmail;
        this.userTel = userTel;
        this.countByAdvice = countByAdvice;
        this.countByAnalyze = countByAnalyze;
        this.countByTranslate = countByTranslate;
    }
}
