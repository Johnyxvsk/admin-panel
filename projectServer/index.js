import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors';
import path from 'path';
import usersRoute from "./routes/users.js";
import ordersRoute from "./routes/orders.js";
import apiRoute from "./routes/api.js";

import {Server} from 'socket.io'
import { createServer } from "http";

//import pup from './puppet.js';
const app = express();
dotenv.config()

const PORT = process.env.PORT || 4000;

const __dirname = path.resolve();
const httpServer = createServer();

const io = new Server(httpServer, {
  cors:{
    origin:"http://localhost:3000",
    methods:["GET", "POST"],
  },
});  



app.use(express.static(path.join(__dirname, '/build')));
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors())

mongoose
.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, ()=> console.log(`Server started ${PORT}`)))
.catch((err)=>console.log(err.message))

io.on('connection', (socket) => {
    console.log('a user connected: ' + socket.id);
    socket.on('msg', (data)=>{
        console.log(data)
    })
});
httpServer.listen(5000);

app.use('/users', usersRoute)
app.use('/orders', ordersRoute)
app.use('/api', apiRoute)

app.get('/*', function(req, res) {
    res.sendFile(path.resolve(__dirname) + '/build/index.html');
});



let now = new Date('2022-05-12T01:35:50.770182Z')


console.log(now.toLocaleTimeString())