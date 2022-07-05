import React from 'react'
import "./home.scss"

import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Widget from '../../components/widgets/Widget'
import Chart from '../../components/chart/Chart'


const Home = () => {
  return (
    <div className='home'>
      <Sidebar/>
      <div className="homeCont">
        <Navbar/>
        <div className="content">
        
          <div className="charts">
            <Chart/>
          </div>
          <div className="widgets">
          <Widget/><Widget/>
          </div>
        </div>
        
        
      </div>
    </div>
  )
}

export default Home