package com.example.medic.translation.domain;

import com.example.medic.analyze.domain.AnalyzeRequestList;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Scanner;

@Entity
@Getter
@NoArgsConstructor
public class TranslationRequestFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long tfId;

    private String trMtl;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trId")
    private TranslationRequestList translationRequestList;
}
