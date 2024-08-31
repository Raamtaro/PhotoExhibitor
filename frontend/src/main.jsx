import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router/Routes.jsx'
import { UserProvider } from './Contexts/UserContext.jsx'
import { SmoothScrollProvider } from './Contexts/SmoothScrollContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SmoothScrollProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </SmoothScrollProvider>
  </StrictMode>
)
