import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import "./login.scss"

import { useAuth  } from "../../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  
  const googleFailure = (res) =>{
    console.log(res)
  }
 
  return (
    <div className='login'>
      <div className="container">
        <br />
        <span className="logo">Taon Dash</span>
        <br />
        <br />
        <div><span>Login com Google</span></div>
        <div className="google">
        
          <GoogleLogin onSuccess={login} onError={googleFailure} />
        </div>
      </div>
      
    </div>
  )
}

export default Login