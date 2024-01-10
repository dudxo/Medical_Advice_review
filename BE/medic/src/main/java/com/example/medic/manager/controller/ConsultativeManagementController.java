package com.example.medic.manager.controller;

import com.example.medic.manager.service.ConsultativeManagementServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ConsultativeManagementController {

    private final ConsultativeManagementServiceImpl consultativeManagementService;


}
