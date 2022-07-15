import React from 'react'
import Icon from "@material-ui/core/Icon";

import './chatHead.scss'
const ChatHead = () => {
  return (
    <div className='chatHead'>
        <div className="chatAvatar">
            avatar
        </div>
        <div className="chatName">
            name
            <div className="lastMsg">
                Hey u beati
            </div>
        </div>
        <div className="chatOptions">
            <Icon className="icon">keyboard_double_arrow_right</Icon>

        </div>
    </div>
  )
}

export default ChatHead