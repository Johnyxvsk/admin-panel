import React, {useState, useEffect, useRef} from 'react'

import './fullChat.scss'
import Icon from "@material-ui/core/Icon";

import io from 'socket.io-client'
const socket = io.connect("http://localhost:5000")

const FullChat = ({pickChat}) => {
    const [socketId, setSocketId] = useState('');
    const [msg, setMsg] = useState("");
    const [chatHist, setChatHist] = useState([]);


    //const [users, setUsers] = useState([]);
    //const [rooms, setRooms] = useState([]);
    //const [joinedRoom, setJoinedRoom] = useState(false);
    //const [room, setRoom] = useState();

    const chatCont = useRef()
    const inputRef = useRef()

    const closeChat = () =>{
        pickChat(false)
    }
    //let rooom = {id:1234}

    const sendMsg = () =>{
        let data = {msg:msg, socketId:socketId} 
        socket.emit('msg', data)
        setMsg("");
        inputRef.current.value = "";
        // socket.on('chat', chatData => {
        //     setChatHist(chatData)
        // })
        // chatCont.current.scrollIntoView({
        //     behavior: 'smooth',
        //     black: 'end',
        // });
     }
  
    // const createRoom = () =>{
    //     socket.emit('createRoom')
    //     socket.on('getRoom', room => {
    //         setRooms([...rooms, room])
    //     })
    
    // }
    // const joinRoom = () =>{

        
    //     socket.emit('joinRoom', rooom)
    //     setRoom(rooom.id)
    //     setJoinedRoom(true);
    //     setChat(rooom.chat)
    
    // }
     
    useEffect(() => {
        socket.on('me', id=> setSocketId(id))

        socket.on('updateChat', data =>{
            setChatHist(data)
           
        })
        // socket.on('disconnect', ()=>{
        //     socket.disconnect();
        // })
        // socket.on('getAllUsers', users =>{
        //     setUsers(users)
        // })
        // socket.on('updateUsers', users =>{
        //     setUsers(users)
        // })
        // socket.on('getAllRooms', rooms =>{
        //     setRooms(rooms)
        // })
        // socket.on('updateRooms', rooms =>{
        //     setRooms(rooms)
        // })
        // socket.on('chat', data => setChat(data.chat))

        // if(joinedRoom){
        //     chatCont.current.scrollIntoView({
        //         behavior: 'smooth',
        //         black: 'end',
        //     });
        // }
        
       
    }, [chatHist]);
  return (

    <div className='fullChat'>
        <div className="chatHeader">
            <div className="chatAvatar">
                
            </div>
            <div className="chatName">
                {socketId.slice(0, 4)}
            </div>
            <div className="options" onClick={closeChat}>
                <Icon className="icon">close</Icon>

            </div>
        </div>
        <div className="chatContent" ref={chatCont}>
            <ul>
                {chatHist.map((chat, index)=> {
                   return ( <li key={index}>
                        <p>{chat.socketId.slice(0, 4)}</p>
                        <p>{chat.msg}</p>
                    </li> )
                } )}
            </ul>
        </div>
        <div className="chatInputs">
            
            <div className="emoji">
                <Icon className="icon">emoji_emotions</Icon>
            </div>
           
            <div className="input">
                <input ref={inputRef} id="textarea" name="textarea" onChange={data=>setMsg(data.target.value)}/>

            </div>
            <div className="send" onClick={sendMsg}>
                <Icon className="icon">send</Icon>

            </div>

        </div>
    </div>
  )
}

export default FullChat