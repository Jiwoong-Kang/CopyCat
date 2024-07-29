import React,{useState, useEffect} from 'react';
import {BrowserRouter, NavLink, Routes, Route} from 'react-router-dom';
import './app.css';
import {Create} from './create/create';
import {Login} from './login/login';
import {Home} from './home';

export default function App(){ 

    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/create' element={<Create />} />
            </Routes>
            
        </BrowserRouter>
    )
}

