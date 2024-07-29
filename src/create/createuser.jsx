async function CreateUser(){
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
        localStorage.setItem('userName', userEmail);
        return true;
    }else{
        const body = await response.json();
        setError(`⚠ Error: ${body.msg}`);
        return false;
    };
};

export {CreateUser};