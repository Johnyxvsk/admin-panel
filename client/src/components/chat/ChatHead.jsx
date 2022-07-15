import React from 'react'
import Icon from "@material-ui/core/Icon";

import './chatHead.scss'
const ChatHead = ({userName, lastMsg, setChat } ) => {

    const openChat = () =>{
        setChat('TEST')
    }
    return (
        <div className='chatHead'>
            <div className="chatAvatar">
                
            </div>
            <div className="chatName">
                {userName}
                <div className="lastMsg">
                    {lastMsg}
                </div>
            </div>
            <div className="chatOptions" onClick={openChat}>
                <Icon className="icon">keyboard_double_arrow_right</Icon>

            </div>
        </div>
    )
}

export default ChatHead