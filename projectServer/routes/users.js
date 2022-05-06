import express from 'express';

const router = express.Router();

import User from '../models/User.js'

router.get("/", async (req, res)=>{
    try {
        const users = await User.find()
        console.log('Users DB Queried')
        res.status(200).json(users)
    } catch (err) {
        console.log(err)
    }    
})

export default router;

