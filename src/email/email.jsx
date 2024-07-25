import React, { useState, useEffect } from 'react';
import OptionButton from './optionbutton';
import Warning from '../warning';
import useDebounce from '../debounce';

// function sendEmail() //여기에 이메일 api 를 넣어야 한다.
function Email({onEmailChange, onError}) {
    const [userEmail, setUserEmail] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
    const [emailConfirmation, setEmailConfirmation] = useState(''); 
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);
    const [completeEmail, setCompleteEmail] = useState('');
    const debouncedUserEmail = useDebounce(userEmail, 300);
    //현재 userEmail인 애들 전부 debounce 되어있는 것으로 바꾸니까 혹시 에러뜨면 그거 고치면됨
    useEffect(()=>{
            if(showError){
                let currentError = null;
                if(!/^[a-zA-Z\d]+$/.test(debouncedUserEmail)){
                    currentError = 1;
                }else if(debouncedUserEmail === ''){
                    currentError = 0;
                }else{
                    currentError = null;
                }
                setError(currentError);
                onError(currentError);
        }
    }, [debouncedUserEmail, emailConfirmation, showError])

    useEffect(() => {
        if (userEmail && emailDomain){
            setCompleteEmail(`${userEmail}@${emailDomain}`);
        }  
    }, [userEmail, emailDomain]);

    useEffect(() => {
        onEmailChange(completeEmail);
    }, [completeEmail, onEmailChange]);

    
    const handleSendEmail = () => {
        sendEmail(completeEmail);
        //sendEmail은 아직 구현이 안돼있다.
    }

    const handleEmailChange = (e) => {
        setUserEmail(e.target.value);
        setShowError(true)
    }

    return(
        <>
            <hr />
            <p className={`title ${error !== null ? 'error' : ''}`}>이메일</p>
            <div className="email-container">
                <input 
                    type="text"
                    className={`email_area ${error !== null ? 'error' : ''}`}
                    placeholder="이메일"
                    value={userEmail}
                    onChange={handleEmailChange}
                />
                <span>@</span>
                <OptionButton setEmailDomain={setEmailDomain} />     
            </div>
            {error !== null && <Warning value={error} />}
            <button 
                type="button" 
                className="btn btn-primary" 
                onClick={handleSendEmail}
                disabled = {error !== null}
            >
                이메일 인증하기
            </button>
             
        </>
    );
};

export {Email};