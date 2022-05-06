import React from 'react'
import "./widget.scss"
//import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
//import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import Icon from "@material-ui/core/Icon";

const Widget = () => {
  return (
    <div className='widget'>
        <div className="left">
            <span className="title">Motoristas:</span>
            <span className="counter">Ativos: 350</span>
            <span className="link">Aguardando: 1.050</span>
           

        </div>
        <div className="right">
            <div className="percentage positive">
            <Icon className="icon">expand_less</Icon>   
            20%
            </div>
            <Icon className="icon">person</Icon>   
        </div>
    </div>
  )
}

export default Widget