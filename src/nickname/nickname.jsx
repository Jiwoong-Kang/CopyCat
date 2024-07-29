import React, {useEffect, useState} from 'react';
import Warning from '../warning';
import useDebounce from '../debounce';

function Nickname({onNicknameChange, onError}){
    const [userNickname, setUserNickname] = useState('');
    const [error, setError] = useState(null); 
    const [showError, setShowError] = useState(false);
    const debouncedUserNick = useDebounce(userNickname, 300);
    useEffect(()=>{
        if(showError){
            let currentError = null;
            if(debouncedUserNick.length < 2){
                currentError = 5;
            }else if(debouncedUserNick === ''){
                currentError = 0;
            }else{
                gettingNick(debouncedUserNick);
            }
            setError(currentError);
            onError(currentError);
        }
    }, [debouncedUserNick,showError]);

    async function gettingNick(debouncedUserNick){
        console.log(debouncedUserNick);
        try {
            const response = await fetch(`/api/gettingNickname/${debouncedUserNick}`);
            if (!response.ok){
                console.log(debouncedUserNick);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const finalNick = await response.json();
            if (finalNick){
                onError(6);
                setError(6);
            }else{
                onError(null);
                setError(null);
            }
        }catch(error){
            console.error('Error: ', error);
        }
    };

    const handleNicknameChange = (e) => {
        setUserNickname(e.target.value);
        onNicknameChange(e.target.value);
        setShowError(true);
    }

    return (
        <>
            <p className={`title ${error !== null ? 'error' : ''}`}>닉네임</p>
            <div className='sub'>다른 유저와 겹치지 않도록 입력해주세요 (2~20자)</div>
            <div className="blank">
                <input 
                    type='text'
                    className={`input_area ${error !== null ? 'error' : ''}`}
                    placeholder='별명 (2~20자)'
                    value={userNickname}
                    onChange={handleNicknameChange} 
                />
            </div>
            {error !== null && <Warning value={error} />}
        </>
    );
};

export {Nickname};
