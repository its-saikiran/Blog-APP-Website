import React, { useState } from 'react'
import UserContext from './UserContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserState = ({ children }) => {

    const [user, setUser] = useState();
    const navigate = useNavigate()
    const [registerMsg, setRegisterMsg] = useState('')
    const [otpMsg, setOtpMsg] = useState(false)
    const [loginMsg, setLoginMsg] = useState(false)
    const [userError, setUserError] = useState();

    const getUserFun = async () => {
        const result = await axios.get(`http://localhost:9000/${3}`)
        setUser(result)
    };

    // REGISTER...
    const registerFun = async (data) => {
        // console.log(data)
        try {
            const result = await axios.post('http://localhost:9000/user/register', data)
            // console.log(result.status)
            setRegisterMsg(result.data.msg)
            setTimeout(() => {
                navigate('/otp')
            }, 3000);
        } catch (error) {
            // console.log(error.response.status)
            const { response } = error;
            switch (response.status) {
                case 401:
                    setRegisterMsg(response.data.Error)
                    break
                case 409:
                    setRegisterMsg(response.data.Error)
                    break
                default:
                    setUserError('500 Internal server error.')
                    navigate('/error')
                    setTimeout(() => {
                        navigate('/')
                    }, 3000);
            }
        }
    }

    // OTP...
    const otpFun = async (data) => {
        try {
            const result = await axios.post('http://localhost:9000/user/otp', data)
            setOtpMsg(result.data.msg)
            setTimeout(() => {
                navigate('/login')
            }, 2000);
        } catch (error) {
            console.log(error.response.status)
            const { response } = error;
            switch (response.status) {
                case 401:
                    setOtpMsg(response.data.Error)
                    break
                case 404:
                    setOtpMsg(response.data.Error)
                    break
                default:
                    setUserError('500 Internal server error.')
                    navigate('/error')
                    setTimeout(() => {
                        navigate('/')
                    }, 2000);
            }
        }
    };

    // LOGIN...
    const loginFun = async (data) => {
        try {
            const result = await axios.post('http://localhost:9000/user/login', data)
            setLoginMsg(result.data.msg)
            setTimeout(() => {
                navigate('/')
            }, 2000);
        } catch (error) {
            console.log(error.response.status)
            const { response } = error;
            switch (response.status) {
                case 401:
                    setLoginMsg(response.data.Error)
                    break
                case 404:
                    setLoginMsg(response.data.Error)
                    break
                default:
                    setUserError('500 Internal server error.')
                    navigate('/error')
                    setTimeout(() => {
                        navigate('/')
                    }, 2000);
            }
        }
    };



    // UPDATE PROFILE...
    const updateUserFun = async (data) => {
        try {
            const result = await axios.post('http://localhost:9000/user/update', data)
            setUser(result)
        } catch (error) {
            console.log(error)
        }
    };

    // LOGOUT...
    const logoutFun = async () => {
        // console.log('log out fun')
        try {
            await axios.delete('http://localhost:9000/user/logout')
            navigate('/')
        } catch (error) {
            // console.log(error.response.status)
            const { response } = error;
            switch (response.status) {
                case 404:
                    setLoginMsg(response.data.Error)
                    navigate('/login')
                    break
                default:
                    setUserError('Internal server error.')
                    navigate('/*')
                    setTimeout(() => {
                        navigate('/')
                    }, 2000);
            }
        }
    };


    const userProviders = {
        user,
        getUserFun,
        registerFun,
        registerMsg,
        setRegisterMsg,
        otpFun,
        otpMsg,
        loginFun,
        loginMsg,
        setLoginMsg,
        updateUserFun,
        logoutFun,
        userError,
    }

    return (
        <UserContext.Provider value={userProviders}>
            {children}
        </UserContext.Provider>
    )
}

export default UserState;
