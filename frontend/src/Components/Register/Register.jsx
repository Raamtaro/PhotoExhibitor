import React from 'react'
// import './RegisterStyles/Register.css'
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';


function Register() {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries());
    console.log(data)

  }
  return (
    <>
      <div className="register-main">
        {/* <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-data">
              <input type="text" id="name" name="name" required/>
              <div className="underline"></div>
              <label htmlFor="name">name</label>
            </div>
          </div>
          <div className="form-row">
            <div className="input-data">
              <input type="email" id="email" name="email" required/>
              <div className="underline"></div>
              <label htmlFor="email">email</label>
            </div>
          </div>
          <div className="form-row">
            <div className="input-data">
              <input type="password" id="password" name="password" required/>
              <div className="underline"></div>
              <label htmlFor="password">password</label>
            </div>
          </div>
          <button type="submit">Sign Up</button>
        </form> */}
      </div>
    </>
  )
}

export default Register