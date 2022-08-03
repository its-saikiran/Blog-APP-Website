import React from 'react'
import BlogList from '../blogs/BlogList';
import About from '../about/About'

const Home = () => {
  return (
    <div>
      <div style={{ marginTop: '12.5vh' }}>
          <img 
              src='https://img.freepik.com/free-psd/web-page-nature-preservation-with-landscape_23-2149047989.jpg?w=2000' 
              alt='img'
              style={{ width: '100%', height: '87.3vh' }}
          />
      </div>
      <div style={{ border: 'solid 0.1px orange', margin: '0.5rem' }}> 
        <BlogList />
      </div>
      <About />
      <h1 className='text-center'><i>THANK YOU...</i></h1>
    </div>
  )
}

export default Home;