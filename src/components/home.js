import React, { Component } from 'react'
import Navbar from './Navbar'
import imgl from '../images/libIMG.jpg'
import '../CSS/home.css'
import Footer from './footer'
export default class home extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <div class="image-container">
            <img src = {imgl} width="100%" height={'100%'}  alt="Library" />
            <div class="text-overlay">
                <h1>Library Management System</h1>
                {/* <a href="/login" class="overlay-button">Get Started</a> */}
            </div>
            </div>
            <Footer/>
      </div>
    )
  }
}
