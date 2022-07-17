import React, {useState} from 'react'
import "./navbar.scss"

import Icon from "@material-ui/core/Icon";
import { useAuth  } from "../../hooks/useAuth";
import Chat from '../chat/Chat';

const NavBar = () => {
  const [chatOpen, setchatOpen] = useState(false);
 
  const openChat = () =>{
      setchatOpen(!chatOpen)
  }
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
            <div className="chatIcon" onClick={() => {openChat()}}>
                <Icon className="icon">chat_bubble_outline</Icon>
                <div className="count">2</div>
            </div>
            {chatOpen && <Chat/>}
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