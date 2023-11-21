package com.example.medic.client.domain;

import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.analyze.domain.AnalyzeRequestList;
import com.example.medic.qna.domain.Qna;
import com.example.medic.translation.domain.TranslationRequestList;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Client {

    @Id
    @NotNull
    @Column(name = "u_id")
    private String uId;

    @NotNull
    private String uPw;


    @NotNull
    private String uRole;

    @NotNull
    private String uName;

    @NotNull
    private String uEmail;

    private String userTel;

    @NotNull
    private String userPhone;

    @NotNull
    private String userAddress;

    private String company;

    private String ceo;

    private String cpTel;

    private String cpFx;

    private String cpNum;

    private String cpAddress;

    @OneToMany(mappedBy = "client")
    private List<Qna> qnas = new ArrayList<>();
    @OneToMany(mappedBy = "client")
    private List<AdviceRequestList> adviceRequests = new ArrayList<>();

    @OneToMany(mappedBy = "client")
    private List<AnalyzeRequestList> analyzeRequestLists = new ArrayList<>();

    @OneToMany(mappedBy = "client")
    private List<TranslationRequestList> translationRequestLists = new ArrayList<>();


    @Builder
    private Client(String uId, String uPw, String uEmail, String uName, String userPhone, String userTel, String userAddress
                    , String company, String ceo, String cpFx, String cpNum, String cpTel, String cpAddress, String uRole){
        this.uId = uId;
        this.uPw = uPw;
        this.uEmail = uEmail;
        this.uName = uName;
        this.userPhone = userPhone;
        this.userTel = userTel;
        this.userAddress = userAddress;
        this.company = company;
        this.ceo = ceo;
        this.cpFx = cpFx;
        this.cpNum = cpNum;
        this.cpTel =cpTel;
        this.uRole = uRole;
        this.cpAddress = cpAddress;
    }
}
