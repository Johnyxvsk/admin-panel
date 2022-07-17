import React, {useState, useEffect, useRef} from 'react'
import Icon from "@material-ui/core/Icon";

import "./chat.scss"
import io from 'socket.io-client'
const socket = io("http://localhost:4000")

const Chat = () => {
    const [anim, setanim] = useState('0px');

    const [chatID, setChatID] = useState('')
    const [chat, setChat] = useState([])
    const [inRoom, setInRoom] = useState(false)
    
    const inputRef = useRef();
    const test = () =>{
        console.log(chat)
    }
    const handleInRoom = () => {
        inRoom
          ? setInRoom(false)
          : setInRoom(true);
    }
    const handleSend = () => {
       console.log(chat)
    }
    useEffect(() => {
        socket.on('joinRoom', {room:123})
        if(inRoom){
            socket.on('updateChat', (chat) => {
                setChat(chat)
            })
        }

    },[inRoom]);
  
    return (
        
        <div className='chat' style={{height: anim}}>
            <div className='fullChat'>
                <div className="chatHeader">
                    <div className="chatAvatar">
                        
                    </div>
                    <div className="chatName">
                        {chatID}
                    </div>
                    <div className="options">
                        <Icon className="icon">close</Icon>

                    </div>
                </div>
                <div className="chatContent">
                     
                    {inRoom && `You Have Entered The Room` }
                    {!inRoom && `Outside Room` }
                  
                    {chat.map((data, idx)=>{
                        return (<p key={idx}> {data.socketId}: {data.msg} </p>)
                    })}
                </div>
                <div className="chatInputs">
                    
                    <div className="emoji" onClick={() => handleInRoom()}>
                        <Icon className="icon">emoji_emotions</Icon>
                    </div>
                
                    <div className="input">
                        <input ref={inputRef} id="textarea" name="textarea" />

                    </div>
                    <div className="send" onClick={() => handleSend()}>
                        <Icon className="icon">send</Icon>

                    </div>

                </div>
            </div>
        </div>
       
    )
}

export default Chat