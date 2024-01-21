package com.example.medic.medicalKnowledge.controller;

import com.example.medic.medicalKnowledge.domain.MedicalNegligenceInfo;
import com.example.medic.medicalKnowledge.dto.MedicalNegligenceInfoDto;
import com.example.medic.medicalKnowledge.service.MedicalNegligenceInfoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Controller
@AllArgsConstructor
public class MedicalNegligenceInfoController {
    private final MedicalNegligenceInfoService medicalNegligenceInfoService;

    //전체 목록조회
    @GetMapping("/find/mnInfoall")
    public ResponseEntity<?> findMedicalNegligenceInfoAll(){
        try{
            List<MedicalNegligenceInfo> medicalNegligenceInfoList = medicalNegligenceInfoService.getAllMedicalNegligenceInfo();
            return ResponseEntity.ok(medicalNegligenceInfoList);
        }catch (Exception e){
            return new ResponseEntity<>("Error" + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //상세 조회
    @GetMapping("/find/mninfo/detail/{mnid}")
    public ResponseEntity<MedicalNegligenceInfo> findMedicalNegligenceInfoDetail(@PathVariable Long mnid){
        try{
            MedicalNegligenceInfo medicalNegligenceInfo = medicalNegligenceInfoService.getMedicalNegligenceInfoDetail(mnid);
            return ResponseEntity.ok(medicalNegligenceInfo);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    //등록
    @PostMapping("/post/mninfo")
    public ResponseEntity<String> insertMedicalNegligenceInfo(@RequestBody MedicalNegligenceInfoDto medicalNegligenceInfoDto){
        try{
            medicalNegligenceInfoService.insertMedicalNegligenceInfo(medicalNegligenceInfoDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //수정
    @PutMapping("/update/mninfo/{mnid}")
    public ResponseEntity<String> updateMedicalNegligenceInfo(@PathVariable Long mnid, @RequestBody MedicalNegligenceInfoDto medicalNegligenceInfoDto){
        try{
            medicalNegligenceInfoService.updateMedicalNegligenceInfo(mnid, medicalNegligenceInfoDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    //삭제
    @DeleteMapping("/delete/mninfo/{mnid}")
    public ResponseEntity<String> deleteMedicalNegligenceInfo(@PathVariable Long mnid){
        try{
            medicalNegligenceInfoService.deleteMedicalNegligenceInfo(mnid);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 검색 기능
     */
    @GetMapping("/search/mninfo")
    public ResponseEntity<List<MedicalNegligenceInfo>> searchMedicalNegligenceInfo(@RequestParam String keyword) {
        try {
            List<MedicalNegligenceInfo> searchResults = medicalNegligenceInfoService.searchMedicalNegligenceInfo(keyword);
            return ResponseEntity.ok(searchResults);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
