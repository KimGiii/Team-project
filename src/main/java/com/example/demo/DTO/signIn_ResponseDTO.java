package com.example.demo.DTO;


import com.example.demo.entity.user_Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class signIn_ResponseDTO {
    private String token;
    private int exprTime;
    private user_Entity user;
}
