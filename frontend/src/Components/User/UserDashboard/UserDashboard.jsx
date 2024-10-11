import React, {useEffect, useState} from 'react'
import { useUser } from '../../../Contexts/UserContext'
import { useNavigate } from 'react-router-dom'

import './styles/UserDashboard.css'

function UserDashboard() {
  const {user, logout, userLoading} = useUser()



  return (
    <>
        <section className="user-home-section">
          <div>Welcome, {`${user?.name}`}</div>

          {/**Section for published collections */}
          {/**
           * Section for redirecting user to create their own
           */}
        </section>  {/**Going to eventually be used to display my collections */}
    </>
    
  )
}

export default UserDashboard