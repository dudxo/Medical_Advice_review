package com.example.medic.advice.controller;

import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.advice.dto.AllAdviceRequestDto;
import com.example.medic.advice.service.AdviceService;
import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.medicalKnowledge.domain.MedicalNegligenceInfo;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@AllArgsConstructor
public class AdviceController {

    private final AdviceService adviceService;

    @PostMapping("/advice/request")
    public ResponseEntity<String> saveAdviceRequest(@RequestBody AllAdviceRequestDto allAdviceRequestDto,
                                                    HttpServletRequest request) {
        HttpSession session = request.getSession();
        String uid = (String) session.getAttribute("uId");

        ClientInfoDto clientInfoDto = ClientInfoDto.builder()
                .uId(uid)
                .build();
        if (adviceService.saveAdviceRequest(allAdviceRequestDto, clientInfoDto)) {
          return  ResponseEntity.ok().body("saved");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed");
    }

    /**
     * 자문의뢰 상세조회
     */
    @GetMapping("/advice/adviceDetail/{adId}")
    public ResponseEntity<AllAdviceRequestDto> findAdviceDetail(@PathVariable Long adId){
        try{
            AllAdviceRequestDto allAdviceRequestDto = adviceService.getAdviceRequestDetail(adId);
            return ResponseEntity.ok(allAdviceRequestDto);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * 자문의뢰 수정
     */
    @PutMapping("/advice/adviceDetail/update/{adId}")
    public ResponseEntity<String> updateAdviceRequestList(@PathVariable Long adId, @RequestBody AllAdviceRequestDto allAdviceRequestDto) {
        boolean result = adviceService.updateAdvice(adId, allAdviceRequestDto);
        if (result) {
            return ResponseEntity.ok("Advice updated successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to update advice.");
        }
    }
}
