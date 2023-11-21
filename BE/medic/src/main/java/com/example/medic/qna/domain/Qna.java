package com.example.medic.qna.domain;

import com.example.medic.client.domain.Client;
import com.example.medic.manager.domain.Manager;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Qna {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long qaId;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotNull
    private Date qaDate;

    @NotNull
    private String qaQuestion;

    private String qaAnswer;

    private boolean qaSecret;

    private String qaPw;

    @ManyToOne
    @JoinColumn(name = "client_Id")
    @JsonIgnore
    private Client client;

    @ManyToOne
    @JoinColumn(name = "mId")
    @JsonIgnore
    private Manager manager;


}
