package com.example.medic.manager.service;

import com.example.medic.advice.domain.AdviceRequestList;
import com.example.medic.advice.repository.AdviceRequestListRepository;
import com.example.medic.client.domain.Client;
import com.example.medic.client.repository.ClientRepository;
import com.example.medic.manager.dto.AdviceListDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ListAllCaseService {

    private final AdviceRequestListRepository adviceRequestListRepository;
    private final ClientRepository clientRepository;

    public List<AdviceListDto> adList(){
        List<AdviceRequestList> adviceRequestLists = adviceRequestListRepository.findAll();
        List<AdviceListDto> adviceListDTOs = new ArrayList<>();
        for(AdviceRequestList adviceRequestList : adviceRequestLists){
            String uName = getClientName(adviceRequestList.getClient());
            AdviceListDto adviceListDto = convertToDTO(adviceRequestList,uName);
            adviceListDTOs.add(adviceListDto);
        }
        return adviceListDTOs;

    }

    private String getClientName(Client client) {
        return (client != null) ? client.getUName() : null;
    }

    private AdviceListDto convertToDTO(AdviceRequestList adviceRequestList, String clientName) {
        return new AdviceListDto(
                adviceRequestList.getAdId(),
                adviceRequestList.getAdPtName(),
                adviceRequestList.getAdPtSsNum(),
                adviceRequestList.getAdPtSub(),
                adviceRequestList.getAdPtDiagnosis(),
                adviceRequestList.getAdPtRec(),
                adviceRequestList.getAdPtCmt(),
                adviceRequestList.getInsurance(),
                adviceRequestList.getInsureDate(),
                adviceRequestList.getInsureName(),
                adviceRequestList.getAdEtc(),
                adviceRequestList.getAdMdDate(),
                adviceRequestList.getAdRegDate(),
                clientName
        );
    }
}
