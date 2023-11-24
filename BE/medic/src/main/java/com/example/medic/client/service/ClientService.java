package com.example.medic.client.service;

import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.client.repository.ClientRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;
    private final Logger logger = LoggerFactory.getLogger(ClientService.class);

    public ClientInfoDto findClinetInfo(ClientInfoDto clientInfoDto) {
        try{
            String uid = clientInfoDto.getUId();
            Client client = findClient(uid);
            ClientInfoDto responseClientInfo = ClientInfoDto.builder()
                    .name(client.getUName())
                    .userTel(clientInfoDto.getUserTel())
                    .userPhone(clientInfoDto.getUserPhone())
                    .userAddress(clientInfoDto.getUserAddress())
                    .build();
            return responseClientInfo;
        }catch (NoSuchElementException n){
            logger.info("해당 회원을 찾을 수 없습니다.");
            return clientInfoDto;
        }
    }

    public Client findClient(String uid){
        Optional<Client> client = clientRepository.findByUId(uid);
        return client.orElseThrow(() -> new NoSuchElementException());
    }
}
