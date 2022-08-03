const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const sendOtp = require('../services/otp.service');
const redis = require('../services/redis');

const { generateToken } = require('../auth/jwt');


const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');


const register = async(req, res) => {
    console.log(`---> controller section!`)
    // console.log(req.body)
    const { email } = req.body;
    try {
        await prisma.user.create({
            data: req.body
        })
        const otp = sendOtp(email)
        if(!otp){
            return res.status(500).json({
                Error: 'Internal server error.'
            })
        }
        redis.setEx(`${email}-->otpNumber`, 500, otp)
        res.status(201).json({
            msg: 'Account created.'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            Error: 'Internal server error.'
        })
    }
};


const verifyOtp = async(req, res) => {
    console.log(`---> verify otp section`)
    // console.log(req.body)
    const { email, otp } = req.body;
    try {
        const redisOtp = await redis.get(`${email}-->otpNumber`)
        if(otp !== redisOtp){
            return res.status(404).json({
                Error: 'Invalid otp.'
            })
        }
        await prisma.user.update({
            where: { email },
            data: {
                verified: true
            }
        })
        res.status(200).json({
            msg: 'Email verified.'
        })
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            Error: 'Internal server error.'
        })
    }
};


const login = async(req, res) => {
    console.log(`---> login section.`)
    // console.log(req.body)
    const { email } = req.body;
    try {
        const userData = await prisma.user.findUnique({
            where: { email }
        })
        const token = generateToken(userData.userId)
        // console.log(token)
        localStorage.setItem('authToken', token)
        res.status(200).json({
            msg: 'log in successfully.'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            Error: 'Internal server error.'
        })
    }
};


const update = async(req, res) => {
    try {
        await prisma.user.update({
            data: req.body
        })
        res.status(201).json({
            msg: 'Updated successfully.'
        })
    } catch (error) {
        res.status(500).json({
            Error: error
        })
    }
};


const logout = async(req, res) => {
    console.log('---> log out section!')
    try {
        localStorage.removeItem('authToken')
        res.status(200).json({
            msg: 'Successfully logged out.'
        })
    } catch (error) {
        res.status(500).json({
            Error: 'Internal server error.'
        })
    }
};


const remove = async(req, res) => {
    try {
        await prisma.user.delete({
            data: {
                where: { id }
            }
        })
        res.status(201).json({
            msg: 'Account deleted successfully.'
        })
    } catch (error) {
        res.status(500).json({
            Error: error
        })
    }
};





module.exports = {
    register,
    verifyOtp,
    login,
    update,
    logout,
    remove,
}