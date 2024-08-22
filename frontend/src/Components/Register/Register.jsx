import React, {useState, useEffect} from 'react'
import './RegisterStyles/Register.css'
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


function Register() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [registeredUserName, setRegisteredUserName] = useState('')

  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries());
    console.log(data)

    try {
      setLoading(true)

      const response = await fetch('http://localhost:3000/auth/register', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        const result = await response.json()
        setRegisteredUserName(result.user.name)
        console.log(result)
      }

    } catch(error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleLoginLink = async (event) => {
    event.preventDefault()
    navigate("/login")

  }
  return (
    <>
      <div className="register-main">
      {registeredUserName && (
          <div className="success-message">
            Thanks for signing up, {registeredUserName}. Please{' '}
            <a href="/login" onClick={handleLoginLink}>
              log in
            </a>{' '}
            with your email and password.
          </div>
        )}
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit} className="form">

          <div className="form__field">
            <input type="text" id="name" name="name" placeholder="Joe Schmoe" required/>
          </div>

          <div className="form__field">
            <input type="email" id="email" name="email" placeholder="info@mailaddress.com" required/>
          </div>

          <div className="form__field">
            <input type="password" id="password" name="password" placeholder="••••••••••••" required/>
          </div>

          <div className="form__field">
            <button type="submit">Create Account</button>
          </div>

        </form>

        <p>Already have an account? <a onClick={handleLoginLink}>Log in</a></p>
      </div>
    </>
  )
}

export default Register