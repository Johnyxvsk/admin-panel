import React, {useState, useEffect, useRef} from 'react'
import Icon from "@material-ui/core/Icon";

import "./chat.scss"
import {io} from 'socket.io-client'
const socket = io("http://localhost:4000")

const Chat = ({toggleChat, userName}) => {
    const [anim, setanim] = useState('0px');

    const [chatID, setChatID] = useState(socket.id)
    const [chatHist, setChatHist] = useState([])
    const [msg, setMsg] = useState()
    const [inRoom, setInRoom] = useState()
    
    const inputRef = useRef();
  
    const handleInRoom = () => {
        inRoom ? setInRoom(false) : setInRoom(true);
    }

    const handleSend = () => {
        let newMsg = {
            msg: msg,
            socketId: chatID
        }
        socket.emit('msg', newMsg);
        inputRef.current.value= "";
        setMsg("")
    }
    useEffect(() => {
        
        socket.emit('me', userName);
        socket.on('me', (me)=> setChatID(me.name))
        socket.on('chatHist', (chatHist)=> setChatHist(chatHist))
        
        

    },[userName, chatHist]);
    useEffect(() => {
        setanim('300px')
    }, []);
  
    return (
        
        <div className='chat' style={{height: anim}}>
            <div className='fullChat'>
                <div className="chatHeader">
                    <div className="chatAvatar">
                        
                    </div>
                    <div className="chatName">
                        {chatID}
                    </div>
                    <div className="options" onClick={() => {
                        setanim('0px')
                        setTimeout(() => {
                            toggleChat()
                        }, 350);
                        }}>
                        <Icon className="icon">close</Icon>

                    </div>
                </div>
                <div className="chatContent">
                     
                    {inRoom && `You Have Entered The Room` }
                    {!inRoom && `Outside Room` }
                  
                    {chatHist.map((data, idx)=>{
                        return (<p key={idx}> {data.socketId}: {data.msg} </p>)
                    })}
                </div>
                <div className="chatInputs">
                    
                    <div className="emoji" onClick={() => handleInRoom()}>
                        <Icon className="icon">emoji_emotions</Icon>
                    </div>
                
                    <div className="input">
                        <input ref={inputRef} id="textarea" name="textarea" onChange={(e)=>{
                            if(e.target.value === 'Enter'){
                                setMsg(e.target.value)
                                handleSend()
                                return
                            }else{
                                setMsg(e.target.value)
                            }
                            
                        }} />

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