import React from 'react'
import { Outlet } from 'react-router-dom'
import UserNavBar from './UserNavBar/UserNavBar'


function UserOutlet() {
  return (
    <>
      <UserNavBar />
      <Outlet/>
    </>
  )
}

export default UserOutlet