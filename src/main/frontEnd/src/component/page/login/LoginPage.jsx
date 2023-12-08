/*eslint-disable*/
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../../store/store';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import A from "./ui/A";

const LogoImage = styled.img`
  wemailth: auto;
  height: 200px;
`

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
`;

const LoginTitle = styled.h1`
  margin: 10px;
`

function LoginPage(){
    let user = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    // const checkCredentials = async (email, password) => {
    //     const body = {
    //         email,
    //         password
    //     }
    //     try{
    //         const response = await axios.post("http://localhost:4000/api/auth/signIn", body);
    //         if(response.status === 200) {
    //             return true;
    //         }
    //     } catch(error) {
    //         console.log("로그인 오류", error);
    //         alert("로그인 오류입니다.");
    //         return false;
    //     }
    // };

    const handleLogin = async(e) => {
        e.preventDefault();
        setLoading(false);

        if (email.length === 0 || password.length === 0) {
            alert("아이디와 비밀번호를 입력하세요.");
            return;
        }

        const data = {
            email,
            password
        }

        axios.post("http://3.88.96.57:4000/api/auth/signIn", data)
             .then((response) => {
                 const responseData = response.data;
                 console.log(responseData);
                 if(!responseData.result) {
                     alert("로그인 실패!");
                     setEmail("");
                     setPassword("");
                     return;
                 }
                 const { token, exprTime } = responseData;
                 setLoading(true);
                 navigate('/home');
             })
             .catch(error => {
                 console.error(error);
                 alert("로그인 실패!");
                 setEmail("");
                 setPassword("");
             })
        // const isAuthenticated = await checkCredentials(email, password);
        //
        // if(isAuthenticated){
        //     setMsg("로그인 성공!");
        //     alert(msg);
        //     dispatch(loginUser({ email: user.email, password: user.password }));
        //     navigate('/home');
        // }
        // else{
        //     setMsg("로그인 정보가 올바르지 않습니다.");
        //     setEmail('');
        //     setPassword('');
        // }
    }

    return (
        <LoginContainer>
            <LogoImage src="../../images/youtube.png" alt="loginImage"/>
            <LoginTitle>로그인하기</LoginTitle>
            <LoginForm onSubmit={handleLogin}>
                <Input
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="아이디를 입력하세요"
                />
                <Input
                    type="password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    placeholder="비밀번호를 입력하세요"
                />
                <Button type="submit">로그인</Button>
            </LoginForm >
            <p>
                계정이 없으신가요? <Link to="/signup">회원가입하기</Link>
            </p>
            {msg}
            <button onClick={()=>{navigate("/home")}}>temporary</button>
        </LoginContainer>
    );
}

export default LoginPage;
//로그인을 누르면 로컬 스토리지에 유저정보를 넣어놓고 그 유저에 대한 정보를 넣고 쓰고 그런식으로 
//구현해야할듯. 이후 내용은 추가구현 
