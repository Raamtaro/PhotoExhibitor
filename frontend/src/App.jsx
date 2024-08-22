import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import NavBar from './Components/NavBar/NavBar'


function App() {
  

  return (
    <>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>© 2024 Raamtaro Inc. All rights reserved.</p>
      </footer>
    </>
  )
}

export default App
