package com.example.medic.qna.repository;

import com.example.medic.qna.domain.Qna;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QnaRepository extends JpaRepository<Qna,Long> {
    @Query("SELECT count(*) FROM Qna q WHERE q.client.uId = :uId")
    int findByClient_UId(String uId);
}
