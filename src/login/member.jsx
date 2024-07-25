import React, {useEffect, useState} from "react";
import Warning from "../warning";
import {useNavigate, NavLink} from 'react-router-dom';
import useDebounce from "../debounce";

function Member() {
    const [ID, setID] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(null);
    const debouncedID = useDebounce(ID, 300);
    const debouncedPassword = useDebounce(password, 300);
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setShowError(true);
    };

    const handleIDChange = (e) => {
        setID(e.target.value);
        setShowError(true);
    };

    async function loginHomepage(){
        loginOrCreate(`/api/auth/login`);
    };

    async function loginOrCreate(endpoint){
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({email:ID, password: password}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (response?.status === 200){
            localStorage.setItem('userName', ID);
            navigate('/')
        }else{
            const body = await response.json();
            setError(`⚠ Error: ${body.msg}`);
            return false;
        }
    };

    return(
        <>
            <div className="login">
                <input
                    type ="text"
                    className = {`input_area ${error !== null ? 'error' : ''}`}
                    placeholder = '이메일'
                    value = {ID}
                    onChange={handleIDChange}
                />
                <input
                    type="password"
                    className={`input_area ${error !== null ? 'error' : ''}`}
                    placeholder="비밀번호"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <div>
            <button 
                type="button"
                className="btn btn-primary"
                onClick = {loginHomepage}
                disabled = {error !== null}
            >
                로그인
            </button>
            </div>
            <div>
                <NavLink to ="/forgot" className="logincomponent">비밀번호 재설정</NavLink>
                <span>{' '}</span>
                <NavLink to ="/create" className="logincomponent">회원가입</NavLink>
            </div>

        </>
    )
}

export {Member}