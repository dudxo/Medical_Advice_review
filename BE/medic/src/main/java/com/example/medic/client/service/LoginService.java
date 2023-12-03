package com.example.medic.client.service;

import com.example.medic.client.domain.Client;
import com.example.medic.client.dto.LoginDto;
import com.example.medic.client.exception.NotCorrespondingIdException;
import com.example.medic.client.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class LoginService {

    private final ClientRepository clientRepository;
    private final Logger logger = LoggerFactory.getLogger(LoginService.class);

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

    public Optional<Client> findClient(LoginDto loginDto) {
        return clientRepository.findByUIdAndUEmail((loginDto.getUId()), loginDto.getUEmail());
    }

    @Transactional
    public boolean updatePassword(LoginDto loginDto) {
        if (loginDto.getNewUpw() == null) {
            throw new IllegalArgumentException("새로운 비밀번호는 null일 수 없습니다.");
        }

        try {
            Optional<Client> optionalClient = findClient(loginDto);

            if (optionalClient.isPresent()) {
                Client client = optionalClient.get();
                client.updatePassword(loginDto.getNewUpw());
                clientRepository.save(client);

                return true;
            }
        } catch (Exception e) {
            logger.error("비밀번호 업데이트 중 오류 발생", e);
        }
        return false;
    }
}