import React, {useState, useEffect} from 'react'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import "./login.scss"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate('')
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  
  useEffect(() => {
    
    if (user) {
      navigate('home')
    }else{
      setUser('')
    }
  }, [user, navigate]);
  
  const googleSuccess = async (res) =>{
    const token = res?.credential;
    const userObj = jwt_decode(token)
    console.log(userObj)
    await dispatch({ type: 'AUTH', data: {userObj, token}})
    navigate('home')

  }
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
        
          <GoogleLogin onSuccess={googleSuccess} onError={googleFailure} />
        </div>
      </div>
      
    </div>
  )
}

export default Login