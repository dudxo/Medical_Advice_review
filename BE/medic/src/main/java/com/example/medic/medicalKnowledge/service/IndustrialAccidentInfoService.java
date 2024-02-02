package com.example.medic.medicalKnowledge.service;

import com.example.medic.manager.domain.Manager;
import com.example.medic.medicalKnowledge.domain.IndustrialAccidentInfo;
import com.example.medic.medicalKnowledge.dto.IndustrialAccidentInfoDto;
import com.example.medic.medicalKnowledge.repository.IndustrialAccidentInfoRepository;
import com.example.medic.medicalKnowledge.repository.IndustrialAccidentInfoRepository.PrevIndustrialAccidentInfoDto;
import com.example.medic.medicalKnowledge.repository.IndustrialAccidentInfoRepository.NextIndustrialAccidentInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class IndustrialAccidentInfoService {
    private final IndustrialAccidentInfoRepository industrialAccidentInfoRepository;
    public List<IndustrialAccidentInfo> getAllIndustrialAccidentInfo(){
        return industrialAccidentInfoRepository.findAll();
    }

    public IndustrialAccidentInfoDto getIndustrialAccidentInfoDetail(Long iaid){
        Optional<IndustrialAccidentInfo> optionalIndustrialAccidentInfo = industrialAccidentInfoRepository.findById(iaid);

        if(optionalIndustrialAccidentInfo.isPresent()){
            IndustrialAccidentInfo industrialAccidentInfo = optionalIndustrialAccidentInfo.get();
            IndustrialAccidentInfoDto industrialAccidentInfoDto = IndustrialAccidentInfoDto.builder()
                    .iaName(industrialAccidentInfo.getIaName())
                    .iaContent(industrialAccidentInfo.getIaContent())
                    .iaInstitution(industrialAccidentInfo.getIaInstitution())
                    .iaRegDate(industrialAccidentInfo.getIaRegDate())
                    .build();
            return industrialAccidentInfoDto;
        }else{
            return null;
        }
    }

    public IndustrialAccidentInfo insertIndustrialAccidentInfo(IndustrialAccidentInfoDto industrialAccidentInfoDto){
//        String managerId = "qkralstj";
//        Manager manager = managerRepository.findById(managerId).get();
//        announcementDto.setMId(managerId);
        IndustrialAccidentInfo industrialAccidentInfo = IndustrialAccidentInfo.builder()
                .iaName(industrialAccidentInfoDto.getIaName())
                .iaInstitution(industrialAccidentInfoDto.getIaInstitution())
                .iaRegDate(industrialAccidentInfoDto.getIaRegDate())
                .iaContent(industrialAccidentInfoDto.getIaContent())
                .manager(industrialAccidentInfoDto.getManager())
                .build();

        return industrialAccidentInfoRepository.save(industrialAccidentInfo);
    }
    public IndustrialAccidentInfo updateIndustrialAccidentInfo(Long iaid, IndustrialAccidentInfoDto industrialAccidentInfoDto){
        IndustrialAccidentInfo industrialAccidentInfo = findIndustrialAccidentInfo(iaid);
        Manager manager = industrialAccidentInfoRepository.findManagerByIaid(iaid);
        if(industrialAccidentInfo == null){
            throw new IllegalArgumentException("게시글을 찾을 수 없습니다.");
        }
        IndustrialAccidentInfo responseIndustrialAccidentInfo = industrialAccidentInfo.builder()
                .iaId(iaid)
                .iaName(industrialAccidentInfoDto.getIaName())
                .iaInstitution(industrialAccidentInfoDto.getIaInstitution())
                .iaMdDate(industrialAccidentInfoDto.getIaMdDate())
                .iaContent(industrialAccidentInfoDto.getIaContent())
                .manager(manager)
                .build();
        return industrialAccidentInfoRepository.save(responseIndustrialAccidentInfo);
    }
    public void deleteIndustrialAccidentInfo(Long iaid){
        IndustrialAccidentInfo industrialAccidentInfo = findIndustrialAccidentInfo(iaid);
        if(industrialAccidentInfo == null){
            throw new IllegalArgumentException("게시글을 찾을 수 없습니다.");
        }
        industrialAccidentInfoRepository.deleteById(iaid);
    }

    public IndustrialAccidentInfo findIndustrialAccidentInfo(Long iaid){
        Optional<IndustrialAccidentInfo> industrialAccidentInfo = industrialAccidentInfoRepository.findById(iaid);
        return industrialAccidentInfo.orElseThrow(() -> new NoSuchElementException());
    }

    /**
     * 검색 기능
     */
    public List<IndustrialAccidentInfo> searchIndustrialAccidentInfo(String keyword) {
        return industrialAccidentInfoRepository.findByIaNameContaining(keyword);
    }

    /**
     * 이전 글 찾기
     */
    public PrevIndustrialAccidentInfoDto findPrevIndustrialAccidentInfo(Long woid) {
        PrevIndustrialAccidentInfoDto prevIndustrialAccidentInfoDto = industrialAccidentInfoRepository.findPrevIndustrialAccident(woid);
        return prevIndustrialAccidentInfoDto;
    }

    /**
     * 다음 글 찾기
     */
    public NextIndustrialAccidentInfoDto findNextIndustrialAccidentInfo(Long woid) {
        NextIndustrialAccidentInfoDto nextIndustrialAccident = industrialAccidentInfoRepository.findNextIndustrialAccident(woid);
        return nextIndustrialAccident;
    }
}
