import React, {useState,} from 'react'
import {useNavigate} from 'react-router-dom'
import "./navbar.scss"

import Icon from "@material-ui/core/Icon";

const NavBar = () => {
  const navigate = useNavigate('')
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  const handleLogout = () =>{
    setUser('')
    localStorage.clear()
    navigate('/')
  }
  return (
    <div className='navbar'>
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder='Search...'/>
          <Icon className="icon">search</Icon>
        </div>
        <div className="items">
          <div className="item">
            <Icon className="icon">chat_bubble_outline</Icon>
            <div className="count">2</div>
          </div>
          <div className="item">
            <Icon className="icon">notifications</Icon>
            <div className="count">1</div>
          </div>
          <div className="item">
            <img className='avatar' src={user.userObj.picture} alt='avatar'/>
            <span className='userName'>{user.userObj.name}</span>
          </div>
          <div className="item" onClick={handleLogout}>
            <Icon className="icon">logout</Icon>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default NavBar