import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../CSS/login.css';
import axios from 'axios';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here (e.g., API call to authenticate user)

    axios.post('http://localhost:5000/login', {
      email: email,
      password: password
    })
      .then((res) => {
        if(res.data.status.includes('success')) {
          const u = res.data.user;
          sessionStorage.setItem('user', JSON.stringify(u));

          window.location = '/';
        }
        alert(res.data.status)
      })
      .catch((err) => console.log(err));

    // Reset form fields after successful login
    setEmail('');
    setPassword('');
  };

  const handleSocialLogin = (provider) => {
    // Handle social media login logic here
  };

  const validateForm = () => {
    setEmailError('');
    setPasswordError('');

    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    return isValid;
  };

  return (
    <div className="login-container">
        <Navbar/>
        <div className='container'>
            
            <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div className='col'>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {emailError && <span className="error-message">{emailError}</span>}
            </div>
            <div className='col'>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {passwordError && <span className="error-message">{passwordError}</span>}
            </div>
            <button type="submit">Login</button>
        </form>
        <div className="social-login">
            <p>Login with social media:</p>
            <button className="social-button" onClick={() => handleSocialLogin('google')}>
            Google
            </button>
            <button className="social-button" onClick={() => handleSocialLogin('facebook')}>
            Facebook
            </button>
            {/* Add more social media buttons as needed */}
        </div>
        
        </div>
    </div>
  );
};

export default Login;
