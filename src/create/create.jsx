import React,{useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {Check} from '../check/check';
import {Email} from '../email/email';
import {Nickname} from '../nickname/nickname';
import {Password} from '../password/password';
import {Robot} from '../robot/robot';
import {Sns} from '../sns/sns';
import './create.css';
// import { CreateNick } from './createnick';
// import { CreateUser } from './createuser';

function Create() {
    
    const [userEmail, setUserEmail] = useState('');
    const [userNickname, setUserNickname] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    async function createUser(){
        loginOrCreate(`/api/auth/create`);
    };

    async function loginOrCreate(endpoint){
        const response = await fetch(endpoint, {
            method: 'post',
            body:JSON.stringify({email: userEmail, password: userPassword, nickname: userNickname}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response?.status === 200){
            return true;
        }else{
            const body = await response.json();
            setError(`⚠ Error: ${body.msg}`);
            return false;
        };
    };

    async function createNick(){
        addNick(`/api/nickname`);
    };

    async function addNick(endpoint){
        const response = await fetch(endpoint, {
            method: 'post',
            body:JSON.stringify({nickname: userNickname}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if(response?.status === 200){
            return true;
        }else{
            const body = await response.json();
            setError(`⚠ Error: ${body.msg}`);
            return false;
        }
    };
    async function comprehensive(){
        setError(null);
        await createUser();
        await createNick();
        navigate('/login');
    };
 

    return (
        <>
            <div className="allinone">
                <div className='overhomepage'>
                    <label>
                        <NavLink to ="/" className="homepage">오늘의 집</NavLink>
                    </label> 
                </div>
                <div className='create'>
                    <div className="bigtitle">회원가입</div>
                    <div className='element'><Sns /></div>
                    <div className='element'><Email onEmailChange={setUserEmail} onError={setError} /></div>    
                    <div className='element'><Password onPasswordChange={setUserPassword} onError={setError} /></div>   
                    <div className='element'><Nickname onNicknameChange={setUserNickname} onError={setError} /></div>   
                    <div className='element'><Check onError={setError} /></div>    
                    {/* <div className='element'><Robot /></div>     */}
                    <button type="button" 
                        className="btn btn-primary" 
                        onClick={comprehensive}
                        disabled = {error !== null}
                    >
                        회원가입하기
                    </button>
                
                    <div className='bottom_login'>
                        <div>이미 아이디가 있으신가요?</div>
                        <nav>
                            <div>
                                <NavLink to ="/login" className="account_login">로그인</NavLink>
                            </div>
                        </nav>
                    </div>           
                </div>
            </div>
        </>       
    )
}

export {Create};
