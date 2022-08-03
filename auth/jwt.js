const jwt = require('jsonwebtoken');
const { secretKey } = require('../auth/config');

const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

const generateToken = (data) => {
    return jwt.sign(data, secretKey)
};


const verifyToken = (req, res, next) => {
    console.log('---> verify token section!')
    const token = localStorage.getItem('authToken')
    // console.log(token)
    if(!token) {
        return res.status(404).json({
            Error: "Please log in your account."
        })
    }
    const decrypted = jwt.verify(token, secretKey)
    const userId = parseInt(decrypted)
    req.body = { ...req.body, userId }
    next()
};



const isUserLoggedIn = (req, res, next) => {
    console.log('---> isUserLoggedIn section!')
    const token = localStorage.getItem('authToken')
    // console.log(token)
    if(token) {
        const decrypted = jwt.verify(token, secretKey)
        const userId = parseInt(decrypted)
        req.body = { ...req.body, userId }
    }
    next()
}


module.exports = {
    generateToken,
    verifyToken,
    isUserLoggedIn
}