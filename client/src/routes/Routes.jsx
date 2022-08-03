import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from '../navbar/NavBar';
import Home from '../pages/home/Home';
import Register from '../pages/register/Register';
import Otp from '../pages/otp/Otp';
import Login from '../pages/login/Login';
import CreateBlog from '../pages/createblog/CreateBlog';
import BlogList from '../pages/blogs/BlogList';
import TargetBlog from '../pages/targetBlog/TargetBlog';
import About from '../pages/about/About';
import Error from '../pages/error/Error';

const HandleRoutes = () => {
  return (
    <>
        <NavBar />
        <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/register' element={ <Register /> } />
            <Route path='/otp' element={ <Otp /> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/createblog' element={ <CreateBlog/> } />
            <Route path='/blogs' element={ <BlogList /> } />
            <Route path='/targetblog' element={ <TargetBlog/> } />
            <Route path='/about' element={ <About />} />
            <Route path='/*' element={ <Error /> } />
        </Routes>
    </>
  )
}

export default HandleRoutes;