package com.example.medic.client.service;

import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.LoginDto;
import com.example.medic.client.exception.NotCorrespondingIdException;
import com.example.medic.client.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class LoginService {

    private final ClientRepository clientRepository;

    public Client login(LoginDto loginDto) {
        Optional<Client> optionalClient = clientRepository.findByUId(loginDto.getUId());

        Client client = optionalClient.orElseThrow(() -> new NotCorrespondingIdException("ID가 일치하지 않습니다."));

        String clientPassword = client.getUPw();
        if (clientPassword == null || !clientPassword.equals(loginDto.getUPw())) {
            throw new IllegalStateException("비밀번호가 일치하지 않습니다.");
        }

        return client;
    }

    public String findId(LoginDto loginDto) {
        Optional<Client> optionalClient =
                clientRepository.findByUNameAndUEmail(loginDto.getUName(), loginDto.getUEmail());
        return optionalClient.map(Client::getUId).orElse(null);
    }

    public String findPw(LoginDto loginDto) {
        Optional<Client> optionalClient =
                clientRepository.findByUNameAndUIdAndUEmail(loginDto.getUName(), loginDto.getUId(), loginDto.getUEmail());
        return optionalClient.map(Client::getUPw).orElse(null);
    }
}