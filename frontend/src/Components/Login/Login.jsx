import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginStyles/Login.css'
import { useUser } from '../../Contexts/UserContext'


function Login() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {login} = useUser()

  const handleRegisterLink = (event) => {
    event.preventDefault()
    navigate('/register')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries());

    // console.log(data) //For the debug

    try {
      setLoading(true)
      const response = await fetch (
        'http://localhost:3000/auth/login',
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      )
      if (response.ok) {
        const result = await response.json()
        login(result.user, result.token)
        navigate('/user/dashboard')
      }
    } catch (error){
      console.error(error.message)

    } finally {
      setLoading(false)
    }


  }
  return (
    <>
      <div className="login-main">
        <h2>Log In</h2>

        <form onSubmit={handleSubmit} className="form">

          <div className="form__field">
            <input type="email" id="email" name="email" placeholder="info@mailaddress.com" required/>
          </div>

          <div className="form__field">
            <input type="password" id="password" name="password" placeholder="••••••••••••" required/>
          </div>

          <div className="form__field">
            <button type="submit">Submit</button>
          </div>

        </form>

        <p>Don't have an account? <a onClick={handleRegisterLink}>Sign Up Now!</a></p>
        <p>Forgot Password? That really sucks :/</p>
      </div>
    </>
  )
}

export default Login