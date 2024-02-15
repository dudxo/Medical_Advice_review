package com.example.medic.medicalKnowledge.service;

import com.example.medic.manager.domain.Manager;
import com.example.medic.medicalKnowledge.domain.WoundInfo;
import com.example.medic.medicalKnowledge.dto.WoundInfoDto;
import com.example.medic.medicalKnowledge.repository.WoundInfoRepository;
import com.example.medic.medicalKnowledge.repository.WoundInfoRepository.PrevWoundInfoDto;
import com.example.medic.medicalKnowledge.repository.WoundInfoRepository.NextWoundInfoDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WoundInfoService {
    private final WoundInfoRepository woundInfoRepository;
    private final Logger logger = LoggerFactory.getLogger(WoundInfoService.class);

    public List<WoundInfo> getAllWoundInfo(){
        return woundInfoRepository.findAll();
    }

    public WoundInfoDto getWoundInfoDetail(Long woid){
        Optional<WoundInfo> optionalWoundInfo = woundInfoRepository.findById(woid);
        if(optionalWoundInfo.isPresent()){
            WoundInfo woundInfo = optionalWoundInfo.get();
            if (woundInfo.getWoMdDate() != null) {
                return WoundInfoDto.builder()
                        .woName(woundInfo.getWoName())
                        .woContent(woundInfo.getWoContent())
                        .woRegDate(woundInfo.getWoMdDate())
                        .woInstitution(woundInfo.getWoInstitution())
                        .build();
            } else {
                return WoundInfoDto.builder()
                        .woName(woundInfo.getWoName())
                        .woContent(woundInfo.getWoContent())
                        .woRegDate(woundInfo.getWoRegdate())
                        .woInstitution(woundInfo.getWoInstitution())
                        .build();
            }
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
        Manager manager = woundInfoRepository.findManagerByWoid(woid);
        if(woundInfo == null){
            throw new IllegalArgumentException("게시글을 찾을 수 없습니다.");
        }
        WoundInfo responsewoundInfo = woundInfo.builder()
                .woId(woid)
                .woName(woundInfoDto.getWoName())
                .woInstitution(woundInfoDto.getWoInstitution())
                .woMdDate(woundInfoDto.getWoMdDate())
                .woContent(woundInfoDto.getWoContent())
                .manager(manager)
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

    /**
     * 검색 기능
     */
    public List<WoundInfo> searchWoundInfo(String keyword) {
        return woundInfoRepository.findByWoNameContaining(keyword);
    }

    /**
     * 이전 글 찾기
     */
    public PrevWoundInfoDto findPrevWoundInfo(Long woid) {
        PrevWoundInfoDto prevWoundInfo = woundInfoRepository.findPrevWound(woid);
        return prevWoundInfo;
    }

    /**
     * 다음 글 찾기
     */
    public NextWoundInfoDto findNextWoundInfo(Long woid) {
        NextWoundInfoDto nextWoundinfo = woundInfoRepository.findNextWound(woid);
        return nextWoundinfo;
    }
}
