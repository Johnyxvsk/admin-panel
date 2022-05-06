import React from 'react'
import "./navbar.scss"

import Icon from "@material-ui/core/Icon";

const NavBar = () => {
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
            <Icon className="icon">settings</Icon>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default NavBar