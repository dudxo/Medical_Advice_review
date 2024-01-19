package com.example.medic.translation.domain;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
<<<<<<< HEAD
=======
import java.time.LocalDate;
import java.util.Date;
import java.util.Scanner;
>>>>>>> feature-faqpage-m

@Entity
@Getter
@NoArgsConstructor
public class TranslationRequestFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long tfId;

    private String trMtl;

    private LocalDate trAnswerDate;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trId")
    private TranslationRequestList translationRequestList;
<<<<<<< HEAD

    @Builder
    public TranslationRequestFile(Long tfId, String trMtl, TranslationRequestList translationRequestList) {
        this.tfId = tfId;
        this.trMtl = trMtl;
        this.translationRequestList = translationRequestList;
    }
=======
    @Builder(toBuilder = true)
    public TranslationRequestFile( LocalDate trAnswerDate,
                           Long tfId, TranslationRequestList translationRequestList) {
       this.trAnswerDate = trAnswerDate;
       this.tfId = tfId;
       this.translationRequestList = translationRequestList;

    }


>>>>>>> feature-faqpage-m
}
