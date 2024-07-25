import React from 'react';
import {NavLink} from 'react-router-dom';

function Home(){
    return(
        <>
            <div>This is home</div>
                <div>
                    <NavLink to = "/create">회원가입</NavLink>
                    <NavLink to = "/login">로그인</NavLink>
                </div>
        </>
    )
}

export {Home};