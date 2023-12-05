package com.example.demo.service;

import com.example.demo.DTO.signInDTO;
import com.example.demo.DTO.signIn_ResponseDTO;
import com.example.demo.DTO.signUpDTO;
import com.example.demo.DTO.responseDTO;
import com.example.demo.entity.user_Entity;
import com.example.demo.repository.user_Repository;
import com.example.demo.security.token_Provider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class auth_Service {

    @Autowired user_Repository user_Repository;
    @Autowired token_Provider token_Provider;

    public responseDTO<?> signup(signUpDTO dto) {
        String email = dto.getEmail();
        String password = dto.getPassword();
        String passwordCheck = dto.getPasswordCheck();

        //email 중복 확인
        try{
            if(user_Repository.existsById(email))
                return responseDTO.setFailed("이메일이 중복됩니다.");
        } catch (Exception e) {
           return responseDTO.setFailed("데이터베이스 연결 오류");
        }

        // 비밀번호가 다르면 fail response 반환
        if(!password.equals(password))
            return responseDTO.setFailed("비밀번호가 일치하지 않습니다.");

        //user_Entity 생성
        user_Entity user_Entity = new user_Entity(dto);

        //user_Repository를 이용해서 데이터베이스에 Entity 저장
        try {
            user_Repository.save(user_Entity);
        } catch (Exception e) {
            return responseDTO.setFailed("데이터베이스 연결 오류");
        }

        //성공시
        return responseDTO.setSuccess("회원가입 완료!", null);
    }

    public responseDTO<signIn_ResponseDTO> signIn(signInDTO dto) {
        String email = dto.getEmail();
        String password = dto.getPassword();
        try{
            boolean existed = user_Repository.existsByEmailAndPassword(email, password);
            if(!existed) return responseDTO.setFailed("로그인 정보가 일치하지 않습니다.");
        } catch (Exception error) {
            return responseDTO.setFailed("데이터베이스 연동 오류!");
        }

        user_Entity user_Entity = null;
        try{
            user_Entity = user_Repository.findById(email).get();
            user_Entity.setPassword("");
        } catch (Exception error) {
            return responseDTO.setFailed("데이터베이스 연동 오류!");
        }

        String token = token_Provider.create(email);
        int exprTime = 3600000;

        signIn_ResponseDTO signIn_ResponseDTO = new signIn_ResponseDTO(token, exprTime, user_Entity);

        return responseDTO.setSuccess("로그인 성공", signIn_ResponseDTO);
    }
}
