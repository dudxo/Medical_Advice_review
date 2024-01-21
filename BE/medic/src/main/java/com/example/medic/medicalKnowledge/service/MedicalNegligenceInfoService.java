package com.example.medic.medicalKnowledge.service;

import com.example.medic.medicalKnowledge.domain.MedicalNegligenceInfo;
import com.example.medic.medicalKnowledge.dto.MedicalNegligenceInfoDto;
import com.example.medic.medicalKnowledge.repository.MedicalNegligenceInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MedicalNegligenceInfoService {
    private final MedicalNegligenceInfoRepository medicalNegligenceInfoRepository;
    public List<MedicalNegligenceInfo> getAllMedicalNegligenceInfo(){
        return medicalNegligenceInfoRepository.findAll();
    }

    public MedicalNegligenceInfo getMedicalNegligenceInfoDetail(Long mnid){
        Optional<MedicalNegligenceInfo> optionalMedicalNegligenceInfo = medicalNegligenceInfoRepository.findById(mnid);

        if(optionalMedicalNegligenceInfo.isPresent()){
            MedicalNegligenceInfo medicalNegligenceInfo = optionalMedicalNegligenceInfo.get();
            return medicalNegligenceInfo;
        }else{
            return null;
        }
    }

    public MedicalNegligenceInfo insertMedicalNegligenceInfo(MedicalNegligenceInfoDto medicalNegligenceInfoDto){
//        String managerId = "qkralstj";
//        Manager manager = managerRepository.findById(managerId).get();
//        announcementDto.setMId(managerId);
        MedicalNegligenceInfo medicalNegligenceInfo = MedicalNegligenceInfo.builder()
                .mnName(medicalNegligenceInfoDto.getMnName())
                .mnInstitution(medicalNegligenceInfoDto.getMnInstitution())
                .mnRegDate(medicalNegligenceInfoDto.getMnRegDate())
                .mnContent(medicalNegligenceInfoDto.getMnContent())
                .manager(medicalNegligenceInfoDto.getManager())
                .build();

        return medicalNegligenceInfoRepository.save(medicalNegligenceInfo);
    }
    public MedicalNegligenceInfo updateMedicalNegligenceInfo(Long mnid, MedicalNegligenceInfoDto medicalNegligenceInfoDto){
        MedicalNegligenceInfo medicalNegligenceInfo = findMedicalNegligenceInfo(mnid);
        if(medicalNegligenceInfo == null){
            throw new IllegalArgumentException("게시글을 찾을 수 없습니다.");
        }
        MedicalNegligenceInfo responsemedicalNegligenceInfo = medicalNegligenceInfo.builder()
                .mnName(medicalNegligenceInfoDto.getMnName())
                .mnInstitution(medicalNegligenceInfoDto.getMnInstitution())
                .mnMdDate(medicalNegligenceInfoDto.getMnMdDate())
                .mnContent(medicalNegligenceInfoDto.getMnContent())
                .manager(medicalNegligenceInfoDto.getManager())
                .build();
        return medicalNegligenceInfoRepository.save(responsemedicalNegligenceInfo);
    }
    public void deleteMedicalNegligenceInfo(Long mnid){
        MedicalNegligenceInfo medicalNegligenceInfo = findMedicalNegligenceInfo(mnid);
        if(medicalNegligenceInfo == null){
            throw new IllegalArgumentException("게시글을 찾을 수 없습니다.");
        }
        medicalNegligenceInfoRepository.deleteById(mnid);
    }

    public MedicalNegligenceInfo findMedicalNegligenceInfo(Long mnid){
        Optional<MedicalNegligenceInfo> medicalNegligenceInfo = medicalNegligenceInfoRepository.findById(mnid);
        return medicalNegligenceInfo.orElseThrow(() -> new NoSuchElementException());
    }

    /**
     * 검색 기능
     */
    public List<MedicalNegligenceInfo> searchMedicalNegligenceInfo(String keyword) {
        return medicalNegligenceInfoRepository.findByMnNameContaining(keyword);
    }
}
