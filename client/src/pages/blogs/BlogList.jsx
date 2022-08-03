import React, { useContext, useEffect } from 'react'
import BlogContext from '../../BlogsCrud/BlogContext';
import './bloglist.css'

const BlogList = () => {

  const { blogs, getAllBlogs, sendReactionFun } = useContext(BlogContext);
  // console.log(blogs)
  useEffect(() => {
    getAllBlogs()
  },[]);

  const likeDislikeFun = (blogId, reaction) => {
    sendReactionFun(blogId, reaction)
  };

  // console.log(blogs)
  
  return (
    
    
    
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ margin: '6rem 10rem'}}>
      <h2 className=''>BLOGS</h2>
      {
        blogs.map(data => ( 
    
          <div key={data.blogId} className="card mb-5">
            <div className=' d-flex align-items-center justify-content-between'>
              <div className='m-1 d-flex'>
                <i className=' fas fa-user m-2 p-1'></i>
                <div className='m-auto'>
                  <h6 className='m-1 mx-2'>{data.user.name}<br /> <p className='fw-light' style={{ fontSize: '12px' }}>Created at : { data.createdAt.slice(0, 10) }</p></h6>
                </div>
              </div>
              <button className='btn btn-info mx-3'><i className="fa-regular fa-pen-to-square"></i></button>
            </div>
            <img src={data.image.length !==0 ? data.image : "https://semantic-ui.com/images/wireframe/image.png"} className="card-img-top" alt="..." style={{ height: '40vh', width: '100%' }} />
            <div className="card-body">
              <h5 className="card-title">{data.title}</h5>
              <p className="card-text">{ data.shortNote }</p>
              {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
            </div>
            <div className='mx-2 d-flex px-2 justify-content-between'>
              <div className='d-flex'>
                <p className='mx-3'><i className="fa-solid fa-thumbs-up mx-2" onClick={() => likeDislikeFun(data.blogId, {  likes: true, dislikes: false })} id={ data.liked ? 't-up-color' : ''} style={{ fontSize: '2rem' }}></i>{ data.likes }</p>
                <p className='mx-3'><i className="fa-solid fa-thumbs-down mx-2" onClick={() =>likeDislikeFun(data.blogId, {  likes: false, dislikes: true })} id={ data.disliked ? 't-down-color' : ''} style={{ fontSize: '2rem' }}></i>{ data.dislikes }</p>
              </div>
              <p className="card-text"><small className="text-muted">Last updated at : { data.updatedAt.slice(0, 10) }</small></p>
              <button className='btn btn-warning mb-2'><i className="fa-regular fa-comment"></i></button>
            </div>
          </div>
          
        ))
      }
    </div>
  )
}

export default BlogList;