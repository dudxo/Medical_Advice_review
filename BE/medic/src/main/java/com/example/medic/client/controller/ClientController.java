package com.example.medic.client.controller;

import com.example.medic.client.dto.ClientInfoDto;
import com.example.medic.client.service.ClientService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@AllArgsConstructor
public class ClientController {

    private final ClientService clientService;


    @GetMapping("/userInfo")
    public ResponseEntity<ClientInfoDto> findUserInfo(HttpServletRequest request) {

        HttpSession session = request.getSession();
        String uid = (String) session.getAttribute("uId");

        ClientInfoDto clientInfoDto = ClientInfoDto.builder()
                .uId(uid)
                .build();
        ClientInfoDto response = clientService.findClientInfo(clientInfoDto);

        return ResponseEntity.ok().body(response);
    }
}
