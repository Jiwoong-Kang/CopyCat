import React from 'react';
import facebookIcon from '../assets/facebook-1.png';
import kakaoIcon from '../assets/kakao.png';
import naverIcon from '../assets/naver.png';
import {NavLink} from 'react-router-dom';

function SnsLogin(){
    return(
        <>
        <div className="sns_explain">SNS계정으로 간편 로그인/회원가입</div>
        <div className="all_sns">
            <a href="https://www.facebook.com" className="sns" target="_blank" rel="noopener noreferrer">
                <img src={facebookIcon} alt="facebook" />
            </a>
            <a href="https://www.kakao.com" className="sns" target="_blank" rel="noopener noreferrer">
                <img src={kakaoIcon} alt="kakaotalk" />
            </a>
            <a href="https://www.naver.com" className="sns" target="_blank" rel="noopener noreferrer">
                <img src={naverIcon} alt="naver" />
            </a>
        </div>
        <div>
            <NavLink to="/loginproblem"  className='loginproblem'>로그인에 문제가 있으신가요?</NavLink>
        </div>
        <hr />
        </>
    );
}; 

export {SnsLogin};

