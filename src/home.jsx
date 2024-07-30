import React from 'react';
import {NavLink} from 'react-router-dom';

function Home(){
    return(
        <div className='home'>
            <div className='tempo'>
                Home
            </div>
            <div>
                <NavLink to = "/create">회원가입</NavLink>
            </div>
            <div>
                <NavLink to = "/login">로그인</NavLink>
            </div>
        </div>
    )
}

export {Home};