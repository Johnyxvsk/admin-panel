import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'

import './profile.scss'

const Profile = () => {
  return (
    <div className='profile'>
      <Sidebar/>
      <div className="profileCont">
        <Navbar/>
        <div className="">
          PROFILEEEE
        </div>
        
        
      </div>
    </div>
  )
}

export default Profile