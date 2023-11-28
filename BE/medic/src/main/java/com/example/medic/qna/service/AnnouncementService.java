package com.example.medic.qna.service;

import com.example.medic.client.service.ClientService;
import com.example.medic.manager.domain.Manager;
import com.example.medic.manager.repository.ManagerRepository;
import com.example.medic.qna.domain.Announcement;
import com.example.medic.qna.dto.AnnouncementDto;
import com.example.medic.qna.repository.AnnouncementRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.OptionalLong;

@Service
@RequiredArgsConstructor
public class AnnouncementService {
    private final AnnouncementRepository announcementRepository;
    private final ManagerRepository managerRepository;

    private final Logger logger = LoggerFactory.getLogger(ClientService.class);


    public List<Announcement> getAllAnnounce(){
            return announcementRepository.findAll();
    }

    public Announcement findDetailAnnounce(Long amId){
        Optional<Announcement> optionalAnnouncement = announcementRepository.findById(amId);

        if(optionalAnnouncement.isPresent()){
            Announcement announcement = optionalAnnouncement.get();
            return announcement;
        }else{
            return null;
        }

    }

    public Announcement saveAnnouncement(AnnouncementDto announcementDto) {
//        String managerId = "qkralstj";
//        Manager manager = managerRepository.findById(managerId).get();
//        announcementDto.setMId(managerId);

        Announcement announcement = Announcement.builder()

                .amName(announcementDto.getAmName())
                .amRegDate(announcementDto.getAmRegDate())
                .amContent(announcementDto.getAmContent())
//                .manager(manager)
                .build();

            logger.info("announcement:{}",announcement);
        return announcementRepository.save(announcement);
    }
}
