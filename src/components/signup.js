import '../CSS/signup.css';
import Navbar from '../components/Navbar';
import axios from 'axios';
  import React, { useState } from 'react';

  const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    // const [photo, setPhoto] = useState(null);
    // const handlePhotoChange = (e) => {
    //   const file = e.target.files[0];
    //   setPhoto(file);
    // };
    const handleSubmit = (e) => {
      e.preventDefault();
      // Perform signup logic here (e.g., API call to register user)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must contain at least 8 characters, one uppercase letter, one number, and one symbol.'
      );
      return;
    }
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
      setMobileError('Mobile number must contain exactly 10 digits.');
      return;
    }
      console.log(`${name}, ${email}, ${password}, ${mobile}`);
      axios.post('http://localhost:5000/register', {
          name: name,
          email: email,
          password: password,
          mobile: mobile
      })
      .then((res)=>console.log(res))
      .catch((err)=> console.log(err));
      // Clear form fields after successful signup
      setName('');
      setEmail('');
      setPassword('');
      setMobile('');
      setIsRegistered(true);
    };

    const handleSocialLogin = (provider) => {
      // Handle social media login logic here
    };

    return (
      <div className="signup-container">
          <Navbar/>
          <div class='container'><h2>Sign Up</h2> 
        
        <form onSubmit={handleSubmit}>
      
          <div class='col'>
            <label>User Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div class='col'>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div class='col'>
            <label>Password:</label>
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <div class='col'>
          <label>Mobile:</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          {mobileError && <p className="error-message">{mobileError}</p>}
          </div>
          {/* <div>
            <label htmlFor="photo">Photo:</label>
            <input type="file" id="photo" accept="image/*" onChange={handlePhotoChange} />
          </div> */}
          <button type="submit">Sign Up</button>
        </form>
        {isRegistered && (
        <div className="success-message">User registered successfully!</div>
      )}
        <div className="social-login">
          <p>Sign in with social media:</p>
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

  export default Signup;
