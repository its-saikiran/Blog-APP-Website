import React, { useContext } from 'react';
import BlogContext from '../../BlogsCrud/BlogContext';
import UserContext from '../../UsersCrud/UserContext'
 
const Error = () => {

  const { userError } = useContext(UserContext)
  const { blogError } = useContext(BlogContext)

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ color: 'red' }}>
      {
        userError || blogError ? userError || blogError : '404 page not found.'
      }
    </div>
  );
};
export default Error;
