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

app.get('/*', function(req, res) {
  res.sendFile(path.resolve(__dirname) + '/build/index.html');
});
let now = new Date()


console.log(now.toLocaleTimeString())