package com.example.medic.consultative.dto;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ConsultativeDto {

    private String cId;

    private String cPw;

    private String cRole;

    private String cName;

    private String cEmail;

    private String cTel;

    private String cPhone;

    private String cAddress;

    private String hospName;

    private String hospTel;

    private String department;

    private String hospFx;

    private String hospNum;

    private String hospAddress;
}
