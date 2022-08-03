import React, { useContext, useState } from 'react'
import BlogContext from './BlogContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UsersCrud/UserContext'

const BlogState = ({ children }) => {

  const [blogs, setBlogs] = useState([]);
  const [createBlogMsg, setCreateBlogMsg] = useState();
  const [blogError, setBlogError] = useState()
  const navigate = useNavigate();


  const { setLoginMsg } = useContext(UserContext)


  const getAllBlogs = async () => {
    try {
      const result = await axios.get('/user/blog/all')
      // console.log('----> ', result)
      const userId = result.data.userId;
      // console.log(result.data.data)
      const displayBlogs = result.data.data.map(blog => {
        // console.log('reactions --> ',blog.reactions)
        if (blog.reactions.length === 0 || !userId) {
          return { ...blog, liked: false, disliked: false }
        }
        const reaction = JSON.parse(blog.reactions[0])
        if (reaction.liked.includes(userId)) {
          return { ...blog, liked: true, disliked: false }
        } else if (reaction.disliked.includes(userId)) {
          return { ...blog, liked: false, disliked: true }
        }else {
          return { ...blog, liked: false, disliked: false }
        }
      })
      // console.log(displayBlogs)
      setBlogs(displayBlogs)
    } catch (error) {
      // console.log(error.response.status)
      const { response } = error;
      switch (response.status){
        case 404:
          setLoginMsg(response.data.Error)
          navigate('/login')
          break
        default:
          setBlogError('Internal server error.')
          navigate('/*')
      }
    }
  };




  const createBlogFun = async (data) => {
    // console.log(data)
    try {
      const result = await axios.post('/user/create', data)
      // console.log(result)
      setCreateBlogMsg(result.data.msg)
      setTimeout(() => {
        getAllBlogs()
        navigate('/blogs')
      }, 2000);
    } catch (error) {
      // console.log(error.response.status)
      const { response } = error;
      switch (response.status) {
        case 404:
          setCreateBlogMsg(response.data.Error)
          navigate('/login')
          break
        default:
          setBlogError(response.data.Error)
          navigate('/error')
          setTimeout(() => {
            navigate('/')
          }, 2000);
      }
    }
  };



  const sendReactionFun = async (blogId, reaction) => {
    try {
      await axios.post(`/user/reaction/${blogId}`, reaction)
      getAllBlogs()
    } catch (error) {
      // console.log(error.response.status)
      const { response } = error;
      switch (response.status) {
        case 404:
          setLoginMsg(response.data.Error)
          navigate('/login')
          break
        default:
          setBlogError('Internal server error.')
          navigate('/*')
          setTimeout(() => {
            navigate('/blogs')
          }, 2000);
      }
    }
  };



  const blogProviders = {
    createBlogFun,
    createBlogMsg,
    getAllBlogs,
    blogs,
    blogError,
    sendReactionFun
  }



  return (
    <BlogContext.Provider value={blogProviders}>
      {children}
    </BlogContext.Provider>
  )
}

export default BlogState;