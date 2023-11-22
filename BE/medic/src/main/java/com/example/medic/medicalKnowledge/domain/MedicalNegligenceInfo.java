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
public class MedicalNegligenceInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long mnId;

    @NotNull
    private String mnName;

    @NotNull
    private String mnInstitution;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotNull
    private Date mnRegdate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date mnMdDate;

    @NotNull
    private String mnContent;

    @ManyToOne
    @JoinColumn(name = "mId")
    @JsonIgnore
    private Manager manager;
}
