const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('website');
const userCollection = db.collection('user');
const userNickname = db.collection('nickname');

function getUser(email){
    return userCollection.findOne({email: email});
}

function getUserByToken(token){
    return userCollection.findOne({token: token});
}

function getNickname(nickname){
    return userNickname.findOne({nickname: nickname});
}

async function createNickname(nickname){
    const nicknameUser = {
        nickname: nickname
    };
    await userNickname.insertOne(nicknameUser);
    return nicknameUser
}

async function createUser(email, password, nickname){
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        email: email,
        password: passwordHash,
        nickname: nickname,
        token: uuid.v4(),
    };
    await userCollection.insertOne(user);

    return user;
}

module.exports = {
    getUser,
    getUserByToken,
    createUser,
    getNickname,
    createNickname
};