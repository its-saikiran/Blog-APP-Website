import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../UsersCrud/UserContext';
import './navbar.css';

const url = '#'

const NavBar = () => {
  
  const { logoutFun } = useContext(UserContext);

  return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow p-3 mb-4 bg-body">
        <div className="container-fluid">
          <a className="navbar-brand px-3" href={url} style={{ color: 'orange', fontStyle: 'italic', fontWeight: 'bold' }}>G-R-O-O-T</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to='/'>HOME</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/blogs'>BLOGS</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/about'>ABOUT</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/createblog'>CREATE-BLOG</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/login'>LOGIN</Link>
              </li>
            </ul>

            <form className="d-flex">
              <input 
                className="form-control me-2" type="search" placeholder="Search" aria-label="Search" 
                style={{ backgroundColor: 'whitesmoke' }}
              />
            </form>

            <ul className="navbar-nav ms-3 mb-2 mb-lg-0 profile-menu px-3">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href={url} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fas fa-user"></i>
                </a>
                <ul className="dropdown-menu px-1" aria-labelledby="navbarDropdown">
                  {/* <li><a className="dropdown-item" href={url}>{ 'userName' }</a></li>
                  <li><a className="dropdown-item" href={url}>{ 'userEmail' }</a></li>
                  <li><a className='dropdown-item' href='{url}'>Edit Profile</a></li> */}
                  <li><a className="dropdown-item" href={url} onClick={logoutFun}> Log Out</a></li>
                  {/* <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href={url}>Delete Account</a></li> */}
                </ul>
              </li>
            </ul>
          </div>
        </div >
      </nav >
  );
};
export default NavBar;
