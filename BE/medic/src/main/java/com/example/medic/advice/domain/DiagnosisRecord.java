package com.example.medic.advice.domain;

import com.example.medic.client.domain.Client;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class DiagnosisRecord {

    @Id
    @GeneratedValue
    @NotNull
    private Long drId;
    @NotNull
    private String hospital;

    @NotNull
    private String admStart;

    @NotNull
    private String admEnd;

    @NotNull
    private String visitStart;

    @NotNull
    private String visitEnd;

    @NotNull
    private String treatCmt;

    @NotNull
    private int diagRound;

    @ManyToOne
    @JoinColumn(name = "adId")
    @JsonIgnore
    private AdviceRequestList adviceRequestList;
}
