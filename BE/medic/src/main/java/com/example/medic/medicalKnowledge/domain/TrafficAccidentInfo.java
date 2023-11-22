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
public class TrafficAccidentInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long taId;

    @NotNull
    private String taName;

    @NotNull
    private String taInstitution;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotNull
    private Date taRegdate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date taMdDate;

    @NotNull
    private String taContent;

    @ManyToOne
    @JoinColumn(name = "mId")
    @JsonIgnore
    private Manager manager;

}
