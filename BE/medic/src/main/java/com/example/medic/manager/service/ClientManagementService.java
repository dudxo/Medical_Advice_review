package com.example.medic.manager.service;

import com.example.medic.advice.repository.AdviceRequestListRepository;
import com.example.medic.analyze.repository.AnalyzeRequestListRepository;
import com.example.medic.client.domain.Client;
import com.example.medic.client.repository.ClientRepository;
import com.example.medic.manager.dto.ManagedClientInfoDto;
import com.example.medic.translation.repository.TranslationRequestListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientManagementService {

    private final AdviceRequestListRepository adviceRequestListRepository;
    private final AnalyzeRequestListRepository analyzeRequestListRepository;
    private final TranslationRequestListRepository translationRequestListRepository;
    private final ClientRepository clientRepository;


    /**
     * 일반 회원 목록 조회
     * return 아이디, 이름, 역할, 이메일, 전화 번호, 자문/분석/번역 의뢰 신청 건수
     */
    public List<ManagedClientInfoDto> findAllClient() {
        List<Client> clients = clientRepository.findAll();
        List<ManagedClientInfoDto> managedClientInfoDtoList = new ArrayList<>();
        for (Client client : clients) {
            ManagedClientInfoDto managedClientInfoDto = ManagedClientInfoDto.builder()
                    .uId(client.getUId())
                    .uName(client.getUName())
                    .uRole(client.getURole())
                    .uEmail(client.getUEmail())
                    .userTel(client.getUserTel())
                    .countByAdvice(countByAdvice(client))
                    .countByAnalyze(countByAnalyze(client))
                    .countByTranslate(countByTranslate(client))
                    .build();
            managedClientInfoDtoList.add(managedClientInfoDto);
        }
        return managedClientInfoDtoList;
    }

    /**
     * 회원 자문 의뢰 전체 건수 조회
     */
    public int countByAnalyze(Client client) {
        return analyzeRequestListRepository.countAllByClient(client);
    }

    /**
     * 회원 분석 의뢰 전체 건수 조회
     */
    public int countByTranslate(Client client) {
        return translationRequestListRepository.countAllByClient(client);
    }

    /**
     * 회원 번역 의뢰 전체 건수 조회
     */
    public int countByAdvice(Client client) {
        return adviceRequestListRepository.countAllByClient(client);
    }

}
