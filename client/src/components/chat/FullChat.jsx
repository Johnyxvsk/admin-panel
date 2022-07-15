import React, {useState} from 'react'

import './fullChat.scss'
import Icon from "@material-ui/core/Icon";

import io from 'socket.io-client'
const socket = io.connect("http://localhost:5000")

const FullChat = ({setChat}) => {
    const [msg, setMsg] = useState();

    const closeChat = () =>{
        setChat(false)
    }
    const sendMsg = () =>{
        console.log(msg)
        socket.emit('msg', msg)
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
                <textarea id="textarea" name="textarea" rows="2" cols="3" onChange={(data)=>{setMsg(data.target.value)}}/>

            </div>
            <div className="send" onClick={sendMsg}>
                <Icon className="icon">send</Icon>

            </div>

        </div>
    </div>
  )
}

export default FullChat