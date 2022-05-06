import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

import Order from '../models/Order.js'

router.get("/", async (req, res)=>{
    try {
        const orders = await Order.find()
        console.log('Orders DB Queried')
        res.status(200).json(orders)
    } catch (err) {
        console.log(err)
    }    
})

router.patch("/:id", async (req, res)=>{
    const {id: _id} = req.params;
    const data = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No order with that id')
    } 

    const updatedOrder = await Order.findByIdAndUpdate(_id, data, { new: true })
    console.log('updatedOrder: ' + updatedOrder)
    res.status(200).json(updatedOrder)
  
})

export default router;

