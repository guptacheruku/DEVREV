import React from 'react';
import '../CSS/navbar.css';
import Signup from './signup';
import {Link} from 'react-router-dom';
import Login from './login';
import booklist from '../components/booklist'
import logout from './logout';
import Cart from './cart';
import Dashboard from './dashboard';
const Nav1 = ({ isLoggedIn, handleLogout }) => {
  const Logout = () => {
    sessionStorage.removeItem('user');
    window.location = '/';
}
  return (
    <nav>
      <ul className="right-items">
      <li className="spacer"></li>
        <li>
        <Link to ="/dashboard" element ={<Dashboard/>}>dashboard</Link> 
        </li>
        <li>
          <Link to ="/booklist" >Books</Link> 
        </li>

        <li>

        <Link to ="/cart" >My Cart</Link> 
        
        </li>

        <li>
          {isLoggedIn ? (
            <>
              <a href="/cart">Cart</a>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              {/* <Link to ="/logout" element ={<logout/>}>Logout</Link>  */}
             {/* < button onClick={Logout}>Logout</button> */}
             <Link to="/logout" onClick={Logout}>Logout</Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav1;
