import React, {useState, useEffect} from 'react'
import ChatHead from './ChatHead';

import './chatMenu.scss'
import FullChat from './FullChat';

const ChatMenu = ({chatOpen} ) => {

    const [anim, setanim] = useState('0px');
    const [selectChat, setSelectChat] = useState(false);


    
    const pickChat = (selection) =>{
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
            <ChatHead userName='Test' lastMsg='yo cunt' pickChat={pickChat}/>
            <ChatHead userName='Thing' lastMsg='wassup?' pickChat={pickChat}/>
            <ChatHead userName='Joey' lastMsg='how u doin?' pickChat={pickChat}/>
        </div>
        :
        <FullChat pickChat={pickChat}/>
        } 
        
    </div>
    
  )
}

export default ChatMenu