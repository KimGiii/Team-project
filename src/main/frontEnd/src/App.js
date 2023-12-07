/*eslint-disable*/
import './App.css';
import React, {useEffect, useState} from 'react';
import LoginPage from './component/page/login/LoginPage';
import { Routes, Route } from 'react-router-dom';
import SignupPage from './component/page/login/SignupPage';
import HomePage from './component/page/home/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShortsPage from './component/page/shorts/ShortsPage';
import axios from "axios";

function App() {

    return (
        <div className="App">
            <Routes>
                <Route path="44.210.23.21:3000" element={ <LoginPage/> }/>
                <Route path="44.210.23.21:3000/signup" element={ <SignupPage/>} />
                <Route path="44.210.23.21:3000/home" element={ <HomePage/>}/>
                <Route path="44.210.23.21:3000/shorts" element={<ShortsPage/>}/>

            </Routes>
        </div>
    );
}

export default App;
