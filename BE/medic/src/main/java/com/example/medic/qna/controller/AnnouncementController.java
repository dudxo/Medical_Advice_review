package com.example.medic.qna.controller;

import com.example.medic.client.service.ClientService;
import com.example.medic.qna.domain.Announcement;
import com.example.medic.qna.dto.AnnouncementDto;
import com.example.medic.qna.repository.AnnouncementRepository;
import com.example.medic.qna.service.AnnouncementService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class AnnouncementController {
    private final AnnouncementService announcementService;
    private final Logger logger = LoggerFactory.getLogger(ClientService.class);

    @GetMapping("/post")
    public ResponseEntity<?> getAllAnnounce(){
        try{
            List<Announcement> announcements= announcementService.getAllAnnounce();
            return ResponseEntity.ok(announcements);
        }catch (Exception e){
            return new ResponseEntity<>("Error" + e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/detail/post/{amId}")
    public ResponseEntity<Announcement> findDetailAnnounce(@PathVariable Long amId) {
        try{
            Announcement announcement = announcementService.findDetailAnnounce(amId);
            return ResponseEntity.ok(announcement);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/write/post")
    public ResponseEntity<String> writeAnnounce( @RequestBody AnnouncementDto announcementDto){
        try{
//            announcementDto.setMId(mId);
            announcementService.saveAnnouncement(announcementDto);

            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
