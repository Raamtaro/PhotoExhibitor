import React from 'react'
import { Outlet } from 'react-router-dom'
import Experience from '../../WebGL/Experience'

function CollectionsOutlet() {
  return (
    <>
      <Experience />  
      <Outlet/>
    </>
  )
}

export default CollectionsOutlet