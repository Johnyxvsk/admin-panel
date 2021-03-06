import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors';
import path from 'path';
import usersRoute from "./routes/users.js";
import ordersRoute from "./routes/orders.js";
import apiRoute from "./routes/api.js";

import {nanoid} from 'nanoid'
import { createServer } from "http";
import { Server } from "socket.io";
import { Socket } from 'dgram';

//import pup from './puppet.js';
const app = express();
const httpServer = createServer(app);

dotenv.config()

const PORT = process.env.PORT || 4000;



const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/build')));
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors())

mongoose
.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => httpServer.listen(PORT, ()=> console.log(`Server started ${PORT}`)))
.catch((err)=>console.log(err.message))

////////////////const server = app.listen()
////////////////io = socket(server)
const io = new Server(httpServer, { cors:{
  origin:"http://localhost:3000",
  methods:["GET", "POST"],
}, });

app.use('/users', usersRoute)
app.use('/orders', ordersRoute)
app.use('/api', apiRoute)


let users = [{id: '1234', name:'online'}]
let rooms = [{id: 1234, chat:['hello ',' you fuck']}]

let chatHist = []

io.on("connection", (socket) => {  
  socket.on('me', user=>{
    const newMe = {
      id: nanoid(),
      name: user,
    }

    users.push(newMe)
    socket.emit('me', newMe)
    socket.emit('chatHist', chatHist)
  })

  socket.on('msg', msgData => {
    chatHist.push(msgData)
    socket.emit('chatHist', chatHist)
  })

  socket.on('room', room => {
    console.log();
    socket.join(room);
    socket.broadcast.to(room).emit('updateChat', {msg:'hey', socketId:'123'})
    console.log(socket.id + " room join: " + room )

  });
  socket.on('leave room', data => {
    console.log('leaving room');
  
    socket.leave(data)
  });
});
  // users.push(socket.id)

  // socket.broadcast.emit('updateUsers', users)

  // socket.emit('getAllUsers', users)
  // socket.broadcast.emit("updateRooms", rooms)
  
  // socket.on('disconnect', ()=>{
  //   users = users.filter((user)=> user !== socket.id)
  //   socket.broadcast.emit('updateUsers', users)
  //   socket.disconnect();
  // })


  // //Rooms
  // socket.on('createRoom', ()=>{
  //     const room = {
  //         id: nanoid(4),
  //         chat: [],
  //     }
  //     socket.join(room);
  //     socket.emit("getRoom", room);
  //     rooms.push(room)
  //     socket.broadcast.emit("updateRooms", rooms)
  // })

  // socket.on("joinRoom", (room)=>{
  //     socket.join(room.id)
  // })

  // socket.emit('getAllRooms', rooms)


  // socket.on('msg', (data) =>{
  //     rooms.map(room => {
  //         if(room.id === data.id){
  //             singleChat = {msg: data.msg, writer: data.socketId}
  //             room.chat.push(singleChat)
  //         }
  //     })
  //     console.log(data)
  //     io.to(data.room).emit('chat', data)
  // })



app.get('/*', function(req, res) {
  res.sendFile(path.resolve(__dirname) + '/build/index.html');
});
let now = new Date()


console.log(now.toLocaleTimeString())