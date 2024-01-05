package com.example.medic.medicalKnowledge.service;

import com.example.medic.medicalKnowledge.domain.WoundInfo;
import com.example.medic.medicalKnowledge.dto.WoundInfoDto;
import com.example.medic.medicalKnowledge.repository.WoundInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WoundInfoService {
    private final WoundInfoRepository woundInfoRepository;
    public List<WoundInfo> getAllWoundInfo(){
        return woundInfoRepository.findAll();
    }

    public WoundInfo getWoundInfoDetail(Long iaid){
        Optional<WoundInfo> optionalWoundInfo = woundInfoRepository.findById(iaid);

        if(optionalWoundInfo.isPresent()){
            WoundInfo woundInfo = optionalWoundInfo.get();
            return woundInfo;
        }else{
            return null;
        }
    }

    public WoundInfo insertWoundInfo(WoundInfoDto woundInfoDto){
//        String managerId = "qkralstj";
//        Manager manager = managerRepository.findById(managerId).get();
//        announcementDto.setMId(managerId);
        WoundInfo woundInfo = WoundInfo.builder()
                .woName(woundInfoDto.getWoName())
                .woInstitution(woundInfoDto.getWoInstitution())
                .woRegDate(woundInfoDto.getWoRegDate())
                .woContent(woundInfoDto.getWoContent())
                .manager(woundInfoDto.getManager())
                .build();

        return woundInfoRepository.save(woundInfo);
    }
    public WoundInfo updateWoundInfo(Long woid, WoundInfoDto woundInfoDto){
        WoundInfo woundInfo = findWoundInfo(woid);
        if(woundInfo == null){
            throw new IllegalArgumentException("게시글을 찾을 수 없습니다.");
        }
        WoundInfo responsewoundInfo = woundInfo.builder()
                .woName(woundInfoDto.getWoName())
                .woInstitution(woundInfoDto.getWoInstitution())
                .woMdDate(woundInfoDto.getWoMdDate())
                .woContent(woundInfoDto.getWoContent())
                .manager(woundInfoDto.getManager())
                .build();
        return woundInfoRepository.save(responsewoundInfo);
    }
    public void deleteWoundInfo(Long woid){
        WoundInfo woundInfo = findWoundInfo(woid);
        if(woundInfo == null){
            throw new IllegalArgumentException("게시글을 찾을 수 없습니다.");
        }
        woundInfoRepository.deleteById(woid);
    }

    public WoundInfo findWoundInfo(Long woid){
        Optional<WoundInfo> woundInfo = woundInfoRepository.findById(woid);
        return woundInfo.orElseThrow(() -> new NoSuchElementException());
    }
}
