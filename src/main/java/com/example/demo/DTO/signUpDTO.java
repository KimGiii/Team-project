package com.example.demo.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class signUpDTO {
    private String email;
    private String password;
    private String passwordCheck;
    private String name;
    private String phoneNumber;
    private String birth;
    private String gender;
}
