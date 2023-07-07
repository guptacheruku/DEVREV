import React from 'react';
import '../CSS/navbar.css';
import Signup from './signup';
import {Link} from 'react-router-dom';
import Login from './login';
import HomePageome from './home';
const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav>
      <ul className="right-items">
      <li className="spacer"></li>
        <li>
        <Link to ="/" element ={<HomePageome/>}>Home</Link> 
        </li>        
        <li>
          {isLoggedIn ? (
            <>
              <a href="/cart">Cart</a>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to ="/signup" element ={<Signup/>}>sign up</Link> 
              <Link to ="/login" element ={<Login/>}>login</Link> 
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
