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
public class WoundInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long woId;

    @NotNull
    private String woName;

    @NotNull
    private String woInstitution;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotNull
    private Date woRegdate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date woMdDate;

    @NotNull
    private String woContent;

    @ManyToOne
    @JoinColumn(name = "mId")
    @JsonIgnore
    private Manager manager;

}
