import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import "./navbar.scss"

import Icon from "@material-ui/core/Icon";
import { useAuth  } from "../../hooks/useAuth";

const NavBar = () => {

  const { logout, user } = useAuth();

  const navigate = useNavigate('')

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
            <img className='avatar' src={user.picture} alt='avatar'/>
            <span className='userName'>{user.name}</span>
          </div>
          <div className="item" onClick={logout}>
            <Icon className="icon">logout</Icon>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default NavBar