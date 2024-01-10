package com.example.medic.manager.controller;

import com.example.medic.manager.dto.AdviceListDto;
import com.example.medic.manager.service.ListAllCaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ListAllCaseController {
    private final ListAllCaseService listAllCaseService;

    @GetMapping("/advice/all")
    public ResponseEntity<List<AdviceListDto>> getAllList(){
        try{
            List<AdviceListDto> getAllAdList = listAllCaseService.adList();
            return ResponseEntity.ok(getAllAdList);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
