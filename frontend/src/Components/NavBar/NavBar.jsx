import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../Contexts/UserContext'

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
        <nav className="main-nav-bar">

            {/**
             * Logged Out nav-items
             */}
            <div className="nav-item register">
                <span></span>
                <div className="nav-item-text">Create Account</div>
            </div>
            <div className="nav-item login">
                <span></span>
                <div className="nav-item-text">Login</div>
            </div>

            {/**
             * Logged-in nav-items
             */}
            <div className="nav-item dashboard">
                <span></span>
                <div className="nav-item-text">My Dashboard</div>
            </div>
            <div className="nav-item exhibits">
                <span></span>
                <div className="nav-item-text">My Galleries</div>
            </div>
            <div className="nav-item workspace">
                <span></span>
                <div className="nav-item-text">My Workspace</div>
            </div>
            <div className="nav-item logout">
                <span></span>
                <div className="nav-item-text">Logout</div>
            </div>


        </nav>
    )
}

export default NavBar