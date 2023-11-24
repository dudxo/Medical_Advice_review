package com.example.medic.client.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ClientInfoDto {

    private String uId;

    private String name;

    private String userTel;

    private String userPhone;

    private String userAddress;
}
