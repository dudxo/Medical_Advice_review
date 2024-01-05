package com.example.medic.medicalKnowledge.controller;

import com.example.medic.medicalKnowledge.domain.IndustrialAccidentInfo;
import com.example.medic.medicalKnowledge.dto.IndustrialAccidentInfoDto;
import com.example.medic.medicalKnowledge.service.IndustrialAccidentInfoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Controller
@AllArgsConstructor
public class IndustrialAccidentInfoController {
    private final IndustrialAccidentInfoService industrialAccidentInfoService;

    //전체 목록조회
    @GetMapping("/find/industaccidentall")
    public ResponseEntity<?> findIndustrialAccidentInfoAll(){
        try{
            List<IndustrialAccidentInfo> industrialAccidentInfoList = industrialAccidentInfoService.getAllIndustrialAccidentInfo();
            return ResponseEntity.ok(industrialAccidentInfoList);
        }catch (Exception e){
            return new ResponseEntity<>("Error" + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //상세 조회
    @GetMapping("/find/industacident/detail/{iaid}")
    public ResponseEntity<IndustrialAccidentInfo> findIndustrialAccidentInfoDetail(@PathVariable Long iaid){
        try{
            IndustrialAccidentInfo industrialAccidentInfo = industrialAccidentInfoService.getIndustrialAccidentInfoDetail(iaid);
            return ResponseEntity.ok(industrialAccidentInfo);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    //등록
    @PostMapping("/post/industacident")
    public ResponseEntity<String> insertIndustrialAccidentInfo(@RequestBody IndustrialAccidentInfoDto industrialAccidentInfoDto){
        try{
            industrialAccidentInfoService.insertIndustrialAccidentInfo(industrialAccidentInfoDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //수정
    @PutMapping("/update/industacident/{iaid}")
    public ResponseEntity<String> updateIndustrialAccidentInfo(@PathVariable Long iaid, @RequestBody IndustrialAccidentInfoDto industrialAccidentInfoDto){
        try{
            industrialAccidentInfoService.updateIndustrialAccidentInfo(iaid, industrialAccidentInfoDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    //삭제
    @DeleteMapping("/delete/industacident/{iaid}")
    public ResponseEntity<String> deleteIndustrialAccidentInfo(@PathVariable Long iaid){
        try{
            industrialAccidentInfoService.deleteIndustrialAccidentInfo(iaid);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
