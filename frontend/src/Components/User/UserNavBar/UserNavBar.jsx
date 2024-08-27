import React from 'react'
import { CiLogout, CiHome, CiEdit, CiSquarePlus } from 'react-icons/ci'
import { useUser } from '../../../Contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import './styles/UserNavBar.css'


const UserNavBar = () => {
    const navigate = useNavigate()
    const {logout, user} = useUser()
    const handleLogout = () => {
        logout();
        navigate('/')
    }
    const handleCreate = () => {
        navigate('/user/collections/create')
    }
    const handleEdit = () => {
        navigate('/user/collections/all')
    }
    const handleDashboard = () => {
        navigate('/user/dashboard')
    }
    return (
        <nav className="user-nav-bar"> {/**This might eventually be merged with the overarching nav bar */}
            <div className="nav-item dashboard" onClick={handleDashboard}>
                <span> <CiHome /> </span>
                <div className="nav-item-text">My Dashboard</div>
            </div>
            <div className="nav-item create" onClick={handleCreate}>
                <span> <CiSquarePlus /></span>
                <div className="nav-item-text">Create Exhibit</div>
            </div>
            <div className="nav-item edit" onClick={handleEdit}>
                <span> <CiEdit /> </span>
                <div className="nav-item-text">Update Exhibit</div>
            </div>
            <div className="nav-item logout" onClick={handleLogout}>
                <span> <CiLogout /></span>
                <div className="nav-item-text">Logout</div>
            </div>

        </nav>
    )
}

export default UserNavBar