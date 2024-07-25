const cookieParser = require('cookie-parser'); //서버 간의 정보상태를 저장해주는 역할
const bcrypt = require('bcrypt'); //비밀번호를 암호화 해주는 역할
const express = require('express'); //프레임워크(get, post를 사용하게 해준다)
const app = express();
const us = require('./user.js');
const cors = require('cors');

const authCookieName = 'token'; //인증 쿠키의 이름을 token으로 설정

const port = process.argv.length > 2 ? process.argv[2] : 4000; //지금 포트번호 맞춰놈

app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credential: true
}));

var apiRouter = express.Router();

app.use(`/api`, apiRouter); //api 라우터를 생성하고 기본경로를 /api로 설정한다.

//http반응에 대하여 인증쿠키를 설정한다
function setAuthCookie(res, authToken){
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite:'strict'
    });
}

//새로운 사용자 즉 회원가입을 했을때 인증 토큰 생성 엔드포인트를 설정한다.

apiRouter.post('/auth/create', async(req, res) => {
    console.log('Request body:', req.body);
    console.log(req.body.email);
    console.log(req.body.password);
    console.log(req.body.nickname);
    if(await us.getUser(req.body.email)){
        res.status(409).send({msg:'Existing user'});
    }else{
        const user = await us.createUser(req.body.email, req.body.password, req.body.nickname);
        setAuthCookie(res, user.token);
        res.send({
            id:user._id
        });
    };
});

//이미 설정돼있는 토큰과 지금 입력한 비밀번호의 토큰을 비교할 수 있게 한다.

apiRouter.post('/auth/login', async(req, res) => {
    const user = await us.getUser(req.body.email);
    if(user){
        if (await bcrypt.compare(req.body.password, user.password)){
            setAuthCookie(res, user.token);
            res.send({id:user._id});
            return ;
        }
    }
    res.status(401).send({msg: 'Unauthorized'});
});

//로그아웃시 쿠키에 저장돼있던 토큰을 지워준다. 로그아웃 함수 만들어야 한다
apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
});

//사용자 정보를 받아오는 엔드포인트
apiRouter.get('/user/:email', async (req, res) => {
    const user = await us.getUser(req.params.email);
    if (user) {
        const token = req?.cookies.token;
        res.send({email:user.email, authenticated:token === user.token});
        return;
    }
    res.status(404).send({msg:'Unknown'});
});

apiRouter.post('/nickname', async(req, res) => {
    try {
        if (await us.getNickname(req.body.nickname)) {
            res.status(409).send({ msg: 'Existing nickname' });
        } else {
            const nickname = await us.createNickname(req.body.nickname);
            res.status(201).send({ msg: 'Nickname created successfully', nickname });
        }
    } catch (error) {
        console.error('Error creating nickname:', error);
        res.status(500).send({ msg: 'Internal server error' });
    }
});

apiRouter.get('/gettingNickname/:nickname', async(req, res) => {
    try{
        const nickname = req.params.nickname;
        const existingNickname = await us.getNickname(nickname);
        if (existingNickname){
            res.status(200).send(existingNickname);
        }else{
            res.status(200).send('');
        }
    }catch(error){
        console.error('Error checking nickname:', error);
        res.status(500).send({msg:'Internal server error'});
    }
});

var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async(req, res, next) => {
    authToken = req.cookies[authCookieName];
    const user = await us.getUserByToken(authToken);
    if (user){
        next();
    }else{
        res.status(401).send({mesg:'Unauthorized'});
    }
});

app.use(function(err, req, res, next){
    res.status(500).send({type:err.name, message: err.message});
});

const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });