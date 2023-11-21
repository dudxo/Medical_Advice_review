package com.example.medic.qna.domain;

import com.example.medic.client.domain.Client;
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

public class Announcement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long amId;

    @NotNull
    private String amName;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotNull
    private Date amRegDate;

    private String amContent;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date amMdDate;

    @ManyToOne
    @JoinColumn(name = "mId")
    @JsonIgnore
    private Manager manager;
}
