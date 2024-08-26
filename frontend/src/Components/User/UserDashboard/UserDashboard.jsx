import React, {useEffect, useState} from 'react'
import { useUser } from '../../../Contexts/UserContext'
import { useNavigate } from 'react-router-dom'

function UserDashboard() {
  const navigate = useNavigate()
  const {user, logout, userLoading} = useUser()
  const handleLogout = (event) => {
    event.preventDefault()
    logout()
    navigate('/')
  }

  useEffect(() => {

  }, [])

  // if (userLoading) {
  //   return <div> loading... </div>
  // }
  return (
    <>
        <div>Welcome, {`${user?.name}`}</div>  {/**Going to eventually be used to display my collections */}
    </>
    
  )
}

export default UserDashboard