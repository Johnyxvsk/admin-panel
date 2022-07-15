import React, {useState, useEffect} from 'react'
import ChatHead from './ChatHead';

import './chatMenu.scss'

const ChatMenu = ({chatOpen, setchatOpen} ) => {

    const [anim, setanim] = useState('0px');
      
    console.log(chatOpen)
    useEffect(() => {
        if(chatOpen){
            setanim('300px')
        }
    }, [chatOpen]);
  return (
    
    <div className='chatMenu' style={{height: anim}}>
        <ChatHead/>
        <ChatHead/>
        <ChatHead/>
    </div>
    
  )
}

export default ChatMenu