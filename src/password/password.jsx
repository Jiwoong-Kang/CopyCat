import React, {useEffect, useState} from 'react';
import Warning from '../warning';
import useDebounce from '../debounce';

const Password = ({onPasswordChange, onError}) => {
    const [password, setPassword] = useState('');
    const [confirmation, setconfirmation] = useState('');
    const [error, setError] = useState(null);
    const [confirmerror, setConfirmerror] = useState(null);
    const [showError, setShowError] = useState(false);
    const [confirmShowError, setConfirmShowError] = useState(false);
    const debouncedPassword = useDebounce(password, 300);
    
    useEffect(() => {
        if (showError){
            let currentError = null;
            if (debouncedPassword.length < 8){
                currentError = 4;
                setError(4);
            }else if(!/^(?=.*[a-zA-Z])(?=.*\d)/.test(debouncedPassword)){
                currentError = 4;
                setError(4);
            }else if(debouncedPassword === ''){
                currentError = 0;
                setError(0);
            }else{
                currentError = null
                setError(null);
            }
        if(confirmShowError){
            if(confirmation === ''){
                currentError = 2;
                setConfirmerror(2);
            }else if(debouncedPassword !== confirmation){
                currentError = 3;
                setConfirmerror(3);
            }else{
                currentError = null;
                setConfirmerror(null);
            }
        }
        onError(currentError);
    }
    },[debouncedPassword, confirmation, showError, confirmShowError]);


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        onPasswordChange(e.target.value);
        setShowError(true);
    };

    const handleConfirmationChange = (e) => {
        setconfirmation(e.target.value);
        setConfirmShowError(true);
    };

    return (
        <>
            <p className={`title ${error !== null ? 'error' : ''}`}>비밀번호</p>
            <div className='sub'>영문,숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.</div>
            <div className="blank">
                <input 
                    type="password"
                    className={`input_area ${error !== null ? 'error' : ''}`}
                    placeholder='비밀번호'
                    value={password}
                    onChange={handlePasswordChange}  
                    />
            </div>
            <div className="error">
                {error !== null && <Warning value={error} />}
            </div>
            <p className={`title ${confirmerror !== null ? 'error' : ''}`}>비밀번호 확인</p>
            <div className="blank">
                <input
                    type='password'
                    className={`input_area ${confirmerror !== null ? 'error' : ''}`}
                    placeholder='비밀번호 확인'
                    value={confirmation}
                    onChange={handleConfirmationChange} 
                    />
            </div>
            <div className="error">
                {confirmerror !== null && <Warning value={confirmerror} />}
            </div>
            
        </>
    );
}

export {Password};