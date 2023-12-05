package com.example.demo.controller;

import com.example.demo.DTO.responseDTO;
import com.example.demo.DTO.signInDTO;
import com.example.demo.DTO.signIn_ResponseDTO;
import com.example.demo.DTO.signUpDTO;

import com.example.demo.service.auth_Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class auth_Controller {

    @Autowired auth_Service auth_service;

    @PostMapping("/signup")
    public responseDTO<?> signup(@RequestBody signUpDTO requestBody) {
        responseDTO<?> result = auth_service.signup(requestBody);

        return result;
    }

    @PostMapping("/signIn")
    public responseDTO<signIn_ResponseDTO> signIn(@RequestBody signInDTO requestBody) {
        responseDTO<signIn_ResponseDTO> result = auth_service.signIn(requestBody);

        return result;
    }


}
