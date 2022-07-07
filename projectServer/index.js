import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors';
import path from 'path';
import usersRoute from "./routes/users.js";
import ordersRoute from "./routes/orders.js";
import apiRoute from "./routes/api.js";
//import defaultRoute from "./routes/defaultRoute.js";

//import pup from './puppet.js';
const app = express();
dotenv.config()

const PORT = process.env.PORT || 4000;

const __dirname = path.resolve();


app.use(express.static(path.join(__dirname, '/build')));
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors())

mongoose
.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, ()=> console.log(`Server started ${PORT}`)))
.catch((err)=>console.log(err.message))

app.use('/users', usersRoute)
app.use('/orders', ordersRoute)
app.use('/api', apiRoute)

app.get('/*', function(req, res) {
    res.sendFile(path.resolve(__dirname) + '/build/index.html');
});

let now = new Date('2022-05-12T01:35:50.770182Z')

// try {
//     pup
// } catch (error) {
//     console.log(error)
// }



console.log(now.toLocaleTimeString())