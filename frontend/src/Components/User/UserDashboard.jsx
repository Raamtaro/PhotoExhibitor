import React from 'react'
import { useUser } from '../../Contexts/UserContext'
import { useNavigate } from 'react-router-dom'

function UserDashboard() {
  const navigate = useNavigate()
  const {user, logout} = useUser()
  const handleLogout = (event) => {
    event.preventDefault()
    logout()
    navigate('/')
  }
  return (
    <>
      <div>Welcome, {`${user.name}`}</div>
      <button onClick={handleLogout}>Logout</button>
    </>
    
  )
}

export default UserDashboard