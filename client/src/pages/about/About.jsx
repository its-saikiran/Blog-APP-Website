import React from 'react'

const About = () => {
  return (
    <div style={{ fontSize: '2rem', margin: '7rem', border: 'solid 0.1px orange', padding: '0 1rem' }}>
      <h2 className='text-center'>ABOUT</h2>

     <p>
      
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     &nbsp;&nbsp;&nbsp;
     Developed a Blog app using React for building user
      interfaces (UI) based on UI components. Made it responsive
      using Bootstrap. I implemented a server fetching data from the
      the front-end through APIs to do all the CRUD operations with
      Postgresql database using PrismaClient. Also created
      functionalities like regex, nodemailer, redis and jwt.
     </p>
      
      <div className='text-end'>
        <h2 className='text-end'>CONTACT</h2>
        <b><i>Email:</i></b>
        <span> saikiran20@gmail.com</span>
        <br />
        <b><i>Phone No:</i></b>
        <span> 9398333693</span>
      </div>

    </div>
  )
}

export default About;