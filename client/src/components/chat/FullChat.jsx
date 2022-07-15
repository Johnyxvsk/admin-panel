import React from 'react'

import './fullChat.scss'
import Icon from "@material-ui/core/Icon";

const FullChat = ({setChat}) => {

    const closeChat = () =>{
        setChat(false)
    }
  return (

    <div className='fullChat'>
        <div className="chatHeader">
            <div className="chatAvatar">
                
            </div>
            <div className="chatName">
                Joey Johnson
            </div>
            <div className="options" onClick={closeChat}>
                <Icon className="icon">close</Icon>

            </div>
        </div>
        <div className="chatContent">
            content
        </div>
        <div className="chatInputs">
            
            <div className="emoji">
                <Icon className="icon">emoji_emotions</Icon>
            </div>
            <div className="input">
                <textarea id="w3review" name="w3review" rows="2" cols="3" />

            </div>
            <div className="send">
                <Icon className="icon">send</Icon>

            </div>

        </div>
    </div>
  )
}

export default FullChat