package com.example.medic.medicalKnowledge.controller;

import com.example.medic.medicalKnowledge.domain.IndustrialAccidentInfo;
import com.example.medic.medicalKnowledge.domain.TrafficAccidentInfo;
import com.example.medic.medicalKnowledge.dto.TrafficAccidentInfoDto;
import com.example.medic.medicalKnowledge.service.TrafficAccidentInfoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@AllArgsConstructor
public class TrafficAccidentInfoController {
    private final TrafficAccidentInfoService trafficAccidentInfoService;

    //전체 목록조회
    @GetMapping("/find/taInfoall")
    public ResponseEntity<?> findTrafficAccidentInfoAll(){
        try{
            List<TrafficAccidentInfo> trafficAccidentInfoList = trafficAccidentInfoService.getAllTrafficAccidentInfo();
            return ResponseEntity.ok(trafficAccidentInfoList);
        }catch (Exception e){
            return new ResponseEntity<>("Error" + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //상세 조회
    @GetMapping("/find/tainfo/detail/{taid}")
    public ResponseEntity<TrafficAccidentInfo> findTrafficAccidentInfoDetail(@PathVariable Long taid){
        try{
            TrafficAccidentInfo trafficAccidentInfo = trafficAccidentInfoService.getTrafficAccidentInfoDetail(taid);
            return ResponseEntity.ok(trafficAccidentInfo);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    //등록
    @PostMapping("/post/tainfo")
    public ResponseEntity<String> insertTrafficAccidentInfo(@RequestBody TrafficAccidentInfoDto trafficAccidentInfoDto){
        try{
            trafficAccidentInfoService.insertTrafficAccidentInfo(trafficAccidentInfoDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //수정
    @PutMapping("/update/mninfo/{taid}")
    public ResponseEntity<String> updateTrafficAccidentInfo(@PathVariable Long taid, @RequestBody TrafficAccidentInfoDto trafficAccidentInfoDto){
        try{
            trafficAccidentInfoService.updateTrafficAccidentInfo(taid, trafficAccidentInfoDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    //삭제
    @DeleteMapping("/delete/mninfo/{taid}")
    public ResponseEntity<String> deleteTrafficAccidentInfo(@PathVariable Long taid){
        try{
            trafficAccidentInfoService.deleteTrafficAccidentInfo(taid);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 검색 기능
     */
    @GetMapping("/search/mninfo")
    public ResponseEntity<List<TrafficAccidentInfo>> searchTrafficAccidentInfo(@RequestParam String keyword) {
        try {
            List<TrafficAccidentInfo> searchResults = trafficAccidentInfoService.searchTrafficAccidentInfo(keyword);
            return ResponseEntity.ok(searchResults);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
