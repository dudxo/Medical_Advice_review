package com.example.medic.medicalKnowledge.service;

import com.example.medic.client.domain.Client;
import com.example.medic.medicalKnowledge.domain.IndustrialAccidentInfo;
import com.example.medic.medicalKnowledge.domain.MedicalNegligenceInfo;
import com.example.medic.medicalKnowledge.dto.IndustrialAccidentInfoDto;
import com.example.medic.medicalKnowledge.repository.IndustrialAccidentInfoRepository;
import com.example.medic.qna.domain.Announcement;
import lombok.Builder;
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

    public IndustrialAccidentInfo getIndustrialAccidentInfoDetail(Long iaid){
        Optional<IndustrialAccidentInfo> optionalIndustrialAccidentInfo = industrialAccidentInfoRepository.findById(iaid);

        if(optionalIndustrialAccidentInfo.isPresent()){
            IndustrialAccidentInfo industrialAccidentInfo = optionalIndustrialAccidentInfo.get();
            return industrialAccidentInfo;
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
        if(industrialAccidentInfo == null){
            throw new IllegalArgumentException("게시글을 찾을 수 없습니다.");
        }
        IndustrialAccidentInfo responseIndustrialAccidentInfo = industrialAccidentInfo.builder()
                .iaName(industrialAccidentInfoDto.getIaName())
                .iaInstitution(industrialAccidentInfoDto.getIaInstitution())
                .iaMdDate(industrialAccidentInfoDto.getIaMdDate())
                .iaContent(industrialAccidentInfoDto.getIaContent())
                .manager(industrialAccidentInfoDto.getManager())
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
    public List<IndustrialAccidentInfo> searchMedicalNegligenceInfo(String keyword) {
        return industrialAccidentInfoRepository.findByIaNameContaining(keyword);
    }
}
