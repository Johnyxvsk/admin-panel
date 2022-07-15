import React, {useState} from 'react'
import Icon from "@material-ui/core/Icon";
import ChatMenu from './ChatMenu';

import "./chat.scss"

const Chat = () => {

    
    const [chatOpen, setchatOpen] = useState(false);
 
    const openChat = () =>{
        setchatOpen(!chatOpen)
    }
 

    return (
        <div className="chatContainer" >
            <div className="chatIcon" onClick={openChat}>
                <Icon className="icon">chat_bubble_outline</Icon>
                <div className="count">2</div>
            </div>
            {chatOpen && <ChatMenu chatOpen={chatOpen} setchatOpen={setchatOpen} /> }
        </div>
    )
}

export default Chat