package com.example.medic.medicalKnowledge.domain;

import com.example.medic.manager.domain.Manager;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor
public class IndustrialAccidentInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long iaId;

    @NotNull
    private String iaName;

    @NotNull
    private String iaInstitution;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotNull
    private Date iaRegdate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date iaMdDate;

    @NotNull
    private String iaContent;

    @ManyToOne
    @JoinColumn(name = "mId")
    @JsonIgnore
    private Manager manager;
}
