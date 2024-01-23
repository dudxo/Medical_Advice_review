package com.example.medic.medicalKnowledge.controller;

import com.example.medic.medicalKnowledge.domain.IndustrialAccidentInfo;
import com.example.medic.medicalKnowledge.domain.WoundInfo;
import com.example.medic.medicalKnowledge.dto.WoundInfoDto;
import com.example.medic.medicalKnowledge.service.WoundInfoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@AllArgsConstructor
public class WoundInfoController {
    private final WoundInfoService woundInfoService;

    //전체 목록조회
    @GetMapping("/find/woInfoall")
    public ResponseEntity<?> findWoundInfoAll(){
        try{
            List<WoundInfo> woundInfoList = woundInfoService.getAllWoundInfo();
            return ResponseEntity.ok(woundInfoList);
        }catch (Exception e){
            return new ResponseEntity<>("Error" + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //상세 조회
    @GetMapping("/find/woinfo/detail/{woid}")
    public ResponseEntity<WoundInfo> findWoundInfoDetail(@PathVariable Long woid){
        try{
            WoundInfo woundInfo = woundInfoService.getWoundInfoDetail(woid);
            return ResponseEntity.ok(woundInfo);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    //등록
    @PostMapping("/post/woinfo")
    public ResponseEntity<String> insertWoundInfo(@RequestBody WoundInfoDto woundInfoDto){
        try{
            woundInfoService.insertWoundInfo(woundInfoDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //수정
    @PutMapping("/update/woinfo/{woid}")
    public ResponseEntity<String> updateWoundInfo(@PathVariable Long woid, @RequestBody WoundInfoDto woundInfoDto){
        try{
            woundInfoService.updateWoundInfo(woid, woundInfoDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    //삭제
    @DeleteMapping("/delete/woinfo/{woid}")
    public ResponseEntity<String> deleteWoundInfo(@PathVariable Long woid){
        try{
            woundInfoService.deleteWoundInfo(woid);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 검색 기능
     */
    @GetMapping("/search/mninfo")
    public ResponseEntity<List<WoundInfo>> searchWoundInfo(@RequestParam String keyword) {
        try {
            List<WoundInfo> searchResults = woundInfoService.searchWoundInfo(keyword);
            return ResponseEntity.ok(searchResults);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
