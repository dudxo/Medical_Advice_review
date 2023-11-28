package com.example.medic.qna.dto;

import com.example.medic.qna.domain.Announcement;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.Date;

@Data
@Builder

public class AnnouncementDto {
    private String amName;
    private Date amRegDate;
    private String amContent;

    private String mId;
    public static AnnouncementDto form(Announcement announcement) {
        return AnnouncementDto.builder()

                .amName(announcement.getAmName())
                .amRegDate(announcement.getAmRegDate())
                .amContent(announcement.getAmContent())
                .build();
    }


}
