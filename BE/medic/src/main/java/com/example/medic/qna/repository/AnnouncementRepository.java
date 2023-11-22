package com.example.medic.qna.repository;

import com.example.medic.qna.domain.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
}
