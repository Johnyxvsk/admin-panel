import React from 'react'
import "./navbar.scss"

import Icon from "@material-ui/core/Icon";
import { useAuth  } from "../../hooks/useAuth";
import Chat from '../chat/Chat';

const NavBar = () => {

  const { logout, user } = useAuth();
  return (
    <div className='navbar'>
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder='Search...'/>
          <Icon className="icon">search</Icon>
        </div>
        <div className="items">
          <div className="item">
            <Chat />
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