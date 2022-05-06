import React from 'react'
import "./sidebar.scss"

import Icon from "@material-ui/core/Icon";

import {Link} from "react-router-dom"

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="top">
            <span className="logo">Admin Panel</span>
        </div>
        <hr/>
        <div className="center">
          <ul>
            <p className="title">Principal:</p>
            <Link to="/" style={{textDecoration: "none"}}>
              <li>
                <Icon className="icon">dashboard</Icon>
                <span>Dashboard</span>
              </li>
            </Link>
            <p className="title">Listas:</p>
            <Link to="/orders" style={{textDecoration: "none"}}>
              <li>
                <Icon className="icon">delivery_dining</Icon>
                <span>Delivery</span>
              </li>
            </Link>
            <Link to="/users" style={{textDecoration: "none"}}>
              <li>
                <Icon className="icon">person_outline</Icon>
                <span>Users</span>
              </li> 
            </Link><Link to="/" style={{textDecoration: "none"}}>
              <li>
                <Icon className="icon">format_list_bulleted</Icon>
                <span>Relatórios</span>
              </li> 
            </Link>
            
            <p className="title">Usuário:</p>
            <Link to="/profile" style={{textDecoration: "none"}}>
              <li>
                <Icon className="icon">account_circle</Icon>
                <span>Profile</span>
              </li> 
            </Link>
            <li>
              <Icon className="icon">logout</Icon>
              <span>Logout</span>
            </li> 
          </ul>
        </div>
        <div className="bottom">
          <div className="colorOption"></div>
          <div className="colorOption"></div>
        </div>

    </div>
  )
}

export default Sidebar