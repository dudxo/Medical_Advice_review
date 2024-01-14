package com.example.medic.qna.repository;

import com.example.medic.qna.domain.Qna;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface QnaRepository extends JpaRepository<Qna,Long> {
    @Query("SELECT count(*) FROM Qna q WHERE q.client.uId = :uId")
    int findByClient_UId(String uId);
    @Query("SELECT q.client.uId FROM Qna q WHERE q.qaId = :qaId")
    Optional<String> findUserIdByQaId(@Param("qaId") Long qaId);
}
