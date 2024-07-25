import {useState, useEffect} from 'react';

async function CreateNick(){
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

export {CreateNick};