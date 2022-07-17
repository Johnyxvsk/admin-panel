import React, {useState, useEffect, useRef} from 'react'
import Icon from "@material-ui/core/Icon";

import "./chat.scss"
import {io} from 'socket.io-client'
const socket = io("http://localhost:4000")

const Chat = ({toggleChat, userName}) => {
    const [anim, setanim] = useState();

    const [chatID, setChatID] = useState(socket.id)
    const [chatHist, setChatHist] = useState([])
    const [msg, setMsg] = useState()
    const [emoji, setEmoji] = useState()
    const [inRoom, setInRoom] = useState()

    const [opened, setopened] = useState(false)
    
    const inputRef = useRef();
    const chatContentRef = useRef();
    const chatRef = useRef();
  
    const handleCloseChat = () => {
        chatRef.current.style.height = 0;
        setTimeout(() => {
           
            toggleChat()
        }, 350);
    }
    const handleEmoji = () => {
        emoji === '👋' ? setEmoji('👻') : setEmoji('👋')
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
       

        return ()=>{
            setopened(false)
        }

    },[userName, chatHist]);

    useEffect(() => {
        setopened(true)
        if(opened){
            setanim('300px')
        }
        
    }, [opened]);
  
    return (
        
        <div className='chat' ref={chatRef}style={{height: anim}}>
            <div className='fullChat'>
                <div className="chatHeader">
                    <div className="chatAvatar">
                        {/* <img src={userAvatar} alt="userAvatar" /> */}
                        {emoji}
                    </div>
                    <div className="chatName">
                        Chat Geral
                    </div>
                    <div className="options" onClick={() => handleCloseChat()}>
                        <Icon className="icon">close</Icon>

                    </div>
                </div>
                <div className="chatContent" ref={chatContentRef}>
                     
                    {inRoom && `You Have Entered The Room` }
                    {!inRoom && `Outside Room` }
                    
                    {chatHist.map((data, idx)=>{
                        
                        return (<p key={idx}> {data.socketId}: {data.msg} </p>)
                    })}
                   
                        
                </div>
                <div className="chatInputs">
                    
                    <div className="emoji" onClick={() => handleEmoji()}>
                        <Icon className="icon">emoji_emotions</Icon>
                    </div>
                
                    <div className="input">
                        <input ref={inputRef} id="textarea" name="textarea" onChange={(e)=>{
                            switch (e.target.value) {
                                case 'Enter':
                                    setMsg(e.target.value)
                                    handleSend()
                                    break;
                                case '👋':
                                    setMsg(e.target.value + "**hackersss**")
                                    break;
                                case 'secret': 
                                    setMsg("sneaky bitch")
                                    break;
                            
                                default:
                                    setMsg(e.target.value)
                                    break;
                            }
                        }}  onKeyDown={(e)=>{
                            if(e.key === 'Enter'){
                                handleSend()
                            }
                        }}/>

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