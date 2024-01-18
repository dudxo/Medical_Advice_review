package com.example.medic.manager.controller;

import com.example.medic.manager.dto.AdDetailDto;
import com.example.medic.manager.dto.AdviceListDto;
import com.example.medic.manager.dto.DocSetDto;
import com.example.medic.manager.service.AdAllListService;
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
public class AdListAllController {
    private static final Logger logger = LoggerFactory.getLogger(AdListAllController.class);
    private final AdAllListService adAllListService;

    /*
    전체 자문의뢰 목록 조회 컨트롤러
     */
    @GetMapping("/advice/all")
    public ResponseEntity<List<AdviceListDto>> adGetAllList(){
        try{
            List<AdviceListDto> getAllAdList = adAllListService.adList();
            logger.info("condot:{}",getAllAdList);
            return ResponseEntity.ok(getAllAdList);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /*
    배정일 및 진행상황 저장하는 컨트롤러
     */
    @PutMapping("/advice/update")
    public ResponseEntity<Integer> updateAdvice(@RequestBody List<AdviceListDto> adviceListDtos){
        logger.info("adviceListDtos:{}",adviceListDtos);
        adAllListService.updateAdviceList(adviceListDtos);
        return ResponseEntity.ok(1);
    }

    /*
    전체 전문의 목록을 조회하는 컨트롤러
     */
    @GetMapping("/ad/docList")
    public ResponseEntity<List<DocSetDto>> adGetDocList(){
          List<DocSetDto> consultatives =  adAllListService.consultatives();

        return ResponseEntity.ok(consultatives);
    }

    /*
    자문의뢰에 전문의를 배정하는 컨트롤러
    */
    @PostMapping("/ad/set/doc/{adId}")
    public ResponseEntity<Integer> setAdDoc(@PathVariable Long adId, @RequestBody DocSetDto dto){
        try{
            if(adAllListService.setDoc(adId,dto)){


                return ResponseEntity.ok(1);
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0);
        }
    }

    /*
    상세페이지 조회 컨트롤러
     */
    @GetMapping("/ad/detail/{adId}")
    public ResponseEntity<AdDetailDto> adDetail(@PathVariable Long adId){
        try{
            AdDetailDto adDetailDto = adAllListService.adDetailDto(adId);
            logger.info("adDetail:{}" ,adDetailDto);
            return ResponseEntity.ok(adDetailDto);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
