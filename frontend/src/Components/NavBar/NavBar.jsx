import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../Contexts/UserContext'
import { CiLogin, CiLogout } from 'react-icons/ci'
import './styles/NavBar.css'


const NavBar = () => {  
    const {user, logout} = useUser()
    const navigate = useNavigate()

    const handleRegister = () => {
        navigate('/register')
    }

    const handleLogin = () => {
        navigate('/login')
    }





    return (
        <nav className="home-nav-bar"> {/**Might come back and refactor this to be THE Nav bar for both user and logged out - dynamically display content based on whether or not a token exists */}
            {/**
             * Logged Out nav-items
             */}
            <div className="nav-item login" onClick={handleLogin}>
                <span> <CiLogin /></span>
                <div className="nav-item-text">Login</div>
            </div>
        </nav>
    )
}

export default NavBar