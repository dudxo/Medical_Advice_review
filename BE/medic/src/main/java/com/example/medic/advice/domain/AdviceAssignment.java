package com.example.medic.advice.domain;


import com.example.medic.consultative.domain.Consultative;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor
public class AdviceAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long admId;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date admDate;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "adId")
    private AdviceRequestList adviceRequestList;

    @ManyToOne
    @JoinColumn(name = "cId")
    @JsonIgnore
    private Consultative consultative;

    @Builder
    public AdviceAssignment(Date admDate, Consultative consultative) {
        this.admDate = admDate;
        this.consultative = consultative;
    }

}
