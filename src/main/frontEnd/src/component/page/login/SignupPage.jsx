/*eslint-disable*/
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../../store/store';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Input from "./ui/Input";
import Button from "./ui/Button";
import A from "./ui/A";
import DatePickerUI from "./ui/DatePickerUI";

const LogoImage = styled.img`
  width: auto;
  height: 200px;
`

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0 20px;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Infotitle = styled.div`
  font-weight: 400;
  text-align: left;
`

const GenderSelect = styled.select`
  font-size: 16px;
  font-family: 'Noto-Sans KR', 'sans-serif';
  padding: 12px;
  border: 1px solid black;
  border-radius: 4px;
`

const GenderOption = styled.option`
  font-size: 15px;
  font-family: 'Noto-Sans KR', 'sans-serif';
`

function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [name, setName] = useState('');;
  const [PasswordCheck, setPasswordCheck] = useState('');
  const [birth, setBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('')
  const [gender, setGender] = useState('');
  const [connection, setConnection] = useState('');

  const checkEmailExists = async (email) => {
     return new Promise((resolve) => {
       setTimeout(() => {
         // 서버에 이메일 중복 검사 요청을 보낸다고 가정
         // 항상 false를 반환하여 이메일이 중복되지 않았다고 가정
         resolve(false);
       }, 1000);
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(birth, typeof birth);
    // const birthday = String(birth).split(" ");
    // console.log(birthday); // 3: year 2: day 1: month 0: 요일
    //필드 공백 여부 확인
    if (!name || !email || !password || !PasswordCheck || !birth || !phoneNumber || !gender){
      alert('모든 정보를 입력해주세요.');
      return;
    }
    //비밀번호와 비밀번호 확인이 일치하는지 확인
    if (password !== PasswordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    //등록된 이메일 여부 확인
    const emailExists = await checkEmailExists(email);
    if (emailExists){
      alert('이미 등록된 이메일입니다. 다른 이메일을 사용해 주세요.');
      return;
    }
    //이름 유효성 검사
    const nameRegex = /^[a-zA-Z가-힣]/;
    if (!nameRegex.test(name)){
      alert('이름은 영문자나 한글로 시작해야합니다.');
      return;
    }
    //핸드폰 번호 유효성 검사
    const phoneRegex = /01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/;
    if (!phoneRegex.test(phoneNumber)){
      alert('핸드폰 번호를 입력해주세요 예시 : 010-1010-1010');
      return;
    }

    // 서버에 회원가입 요청을 보내는 로직
    const body = { name, email, password, birth, phoneNumber, gender }
    axios.post('http://localhost:4000/api/auth/signup', body)
        .then(response => {
          // 성공 처리 로직 구현하기
          navigate('/')
        })
        .catch(error => {
          // 에러 처리 로직
          console.error(error);
          alert("회원가입 중 문제가 발생했습니다.")
        });
  };

  return (
      <SignupContainer>
        <LogoImage src="../../images/youtube.png" alt="signupImage"/>
        <h1>회원가입하기</h1>
        <SignupForm onSubmit={handleSubmit}>
          <Infotitle>이메일</Infotitle>
          <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
          />
          <Infotitle>비밀번호</Infotitle>
          <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
          />
          <Infotitle>비밀번호 확인</Infotitle>
          <Input
              type="password"
              value={PasswordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              placeholder="비밀번호 확인"
          />
          <Infotitle>이름</Infotitle>
          <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
          />
          <Infotitle>휴대폰 번호</Infotitle>
          <Input
              type="text"
              value={phoneNumber}
              onChange={(e)=>{setPhoneNumber(e.target.value)}}
              placeholder="휴대전화번호를 입력하세요"
          />
          <Infotitle>생년월일</Infotitle>
          <Input
              type="text"
              value={birth}
              onChange={(e)=>{setBirth(e.target.value)}}
              placeholder="생년월일을 입력하세요"
          />
          <Infotitle>성별</Infotitle>
          <GenderSelect value={gender} onChange={(e) => setGender(e.target.value)}>
            <GenderOption>성별을 선택해주세요</GenderOption>
            <GenderOption value="남자">남자</GenderOption>
            <GenderOption value="여자">여자</GenderOption>
          </GenderSelect>

          <Button type="submit">회원가입</Button>
        </SignupForm>
        <p>
          이미 계정이 있으신가요? <A href="/" content="로그인하기" />
        </p>
      </SignupContainer>
  );
}

export default SignupPage;
