import React, {useState, useEffect} from 'react'
import ChatHead from './ChatHead';

import './chatMenu.scss'
import FullChat from './FullChat';

const ChatMenu = ({chatOpen} ) => {

    const [anim, setanim] = useState('0px');
    const [selectChat, setSelectChat] = useState(false);

    
    
    const setChat = (selection) =>{
        setSelectChat(selection)
    }

    useEffect(() => {
        if(chatOpen){
            setanim('300px')
        }
    }, [chatOpen]);
  return (
    
    <div className='chatMenu' style={{height: anim}}>
        {!selectChat ? <div>
            <ChatHead userName='Test' lastMsg='yo cunt' setChat={setChat}/>
            <ChatHead userName='Thing' lastMsg='wassup?' setChat={setChat}/>
            <ChatHead userName='Joey' lastMsg='how u doin?' setChat={setChat}/>
        </div>
        :
        <FullChat setChat={setChat}/>
        } 
        
    </div>
    
  )
}

export default ChatMenu