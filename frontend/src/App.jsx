import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import NavBar from './Components/NavBar/NavBar'
import {ReactLenis, useLenis} from 'lenis/react'


function App() {
  

  return (
    <>
      <ReactLenis root>  
        <main>
          <Outlet />
        </main>
        <footer>
          <p>© 2024 Raamtaro Inc. All rights reserved.</p>
        </footer>
      </ReactLenis>
    </>
  )
}

export default App
