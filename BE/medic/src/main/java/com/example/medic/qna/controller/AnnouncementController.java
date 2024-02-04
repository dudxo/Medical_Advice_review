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
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<AnnouncementDto> findDetailAnnounce(@PathVariable Long amId) {
        try{
            logger.info("amId:{}",amId);
            AnnouncementDto announcementDto = announcementService.announcdDetial(amId);
            return ResponseEntity.ok(announcementDto);
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

    @PutMapping("/update/post/{amId}")
    public ResponseEntity<Integer> updateAnnounce(@PathVariable Long amId,@RequestBody AnnouncementDto announcementDto){
        logger.info("amidid:{}",amId);
        logger.info("amididto:{}",announcementDto.getAmContent());
        if(amId == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(0);
        }
         announcementService.updateAnnouncement(amId,announcementDto);
        return ResponseEntity.ok(1);
    }

    @DeleteMapping("/delete/post/{amId}")
    public ResponseEntity<Integer> deleteAnnounce(@PathVariable Long amId){
        logger.info("amId:{}",amId);
        if(amId == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        announcementService.deleteAnnouncement(amId);
        return ResponseEntity.ok(1);
    }

}
