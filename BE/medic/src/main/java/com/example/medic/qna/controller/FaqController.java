package com.example.medic.qna.controller;

import com.example.medic.manager.controller.AdListAllController;
import com.example.medic.qna.domain.Faq;
import com.example.medic.qna.dto.FaqSituationDto;
import com.example.medic.qna.service.FaqSituationService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class FaqController {

    private final FaqSituationService faqSituationService;
    private static final Logger logger = LoggerFactory.getLogger(FaqController.class);


    /*
    faq 리스트 조회
     */
    @GetMapping("/faq/list")
    public ResponseEntity<List<Faq>> faqList(){
        try{
            List<Faq> faq = faqSituationService.faqSituationList();
            return ResponseEntity.ok(faq);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /*
    faq 작성
     */
    @PostMapping("/write/faq/{mId}")
    public ResponseEntity<Integer> writeFaq(@PathVariable String mId, @RequestBody FaqSituationDto faqSituationDto){
        try{
            logger.info("mid:{}",mId);
            logger.info("faqdto:{}",faqSituationDto);
//            logger.info("faqSistatinon:{}",faqSituationService.writeFaq(mId, faqSituationDto));
            if(faqSituationService.writeFaq(mId, faqSituationDto)){
                return ResponseEntity.ok(1);
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0);
        }
    }

    /*
    faq 수정
     */
    @PutMapping("/faq/update/{mId}")
    public ResponseEntity<Integer> updateFaqp(@PathVariable String mId, FaqSituationDto faqSituationDto){
        try{
            if(faqSituationService.updateFaq(mId, faqSituationDto)){
                return ResponseEntity.ok(1);
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0);
        }catch (Exception e){
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0);
        }
    }

    /*
    faq 삭제
     */

    @DeleteMapping("/faq/delete/{faqId}")
    public ResponseEntity<Integer> deleteFaq(@PathVariable Long faqId){
        try{
            if (faqSituationService.deleteFaq(faqId)){
                return ResponseEntity.ok(1);
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0);
        }
    }
}
