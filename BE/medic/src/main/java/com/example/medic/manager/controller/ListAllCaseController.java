package com.example.medic.manager.controller;

import com.example.medic.consultative.domain.Consultative;
import com.example.medic.manager.dto.AdviceListDto;
import com.example.medic.manager.dto.DocSetDto;
import com.example.medic.manager.service.ListAllCaseService;
import lombok.RequiredArgsConstructor;
import org.hibernate.Hibernate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.print.Doc;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class ListAllCaseController {
    private static final Logger logger = LoggerFactory.getLogger(ListAllCaseController.class);
    private final ListAllCaseService listAllCaseService;

    @GetMapping("/advice/all")
    public ResponseEntity<List<AdviceListDto>> getAllList(){
        try{
            List<AdviceListDto> getAllAdList = listAllCaseService.adList();
            logger.info("condot:{}",getAllAdList);
            return ResponseEntity.ok(getAllAdList);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/advice/update")
    public ResponseEntity<Integer> updateAdvice(@RequestBody List<AdviceListDto> adviceListDtos){
        logger.info("adviceListDtos:{}",adviceListDtos);
        listAllCaseService.updateAdviceList(adviceListDtos);
        return ResponseEntity.ok(1);
    }

    @GetMapping("/ad/docList")
    public ResponseEntity<List<DocSetDto>> getDocList(){
          List<DocSetDto> consultatives =  listAllCaseService.consultatives();
//        consultatives.forEach(consultative -> {
//            Hibernate.initialize(consultative.getAdviceAssignments());
//        });

        return ResponseEntity.ok(consultatives);
    }

//    @PostMapping("/ad/set/doc/{adId}")
//    public ResponseEntity<Integer> setDoc(@PathVariable Long adId, @RequestBody DocSetDto dto){
//        try{
//
//        }
//    }
}
