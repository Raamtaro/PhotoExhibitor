import React, {useEffect, useState} from 'react'
import NavBar from '../NavBar/NavBar'
import { useNavigate } from 'react-router-dom'

import './styles/Home.css'



function Home() {
  const navigate = useNavigate()

  const navigateToLogin = () => {
    navigate('/login')
  }

  const navigateToSignup = () => {
    navigate('/register')
  }



  return (
    <>
      <NavBar />
      <section className="home-main">
        <h2>
          <span>Show off your hard work.</span>
          <span>Share your photos with the world.</span>
        </h2>
        <ul className='home-links'>
          <li onClick={navigateToLogin}>Login</li>
          <li onClick={navigateToSignup}>Sign Up</li>
        </ul>
      </section>
    </>

  )
}

export default Home