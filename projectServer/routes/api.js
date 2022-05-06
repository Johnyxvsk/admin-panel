import express from 'express';
import Chart from '../models/Chart.js'

const router = express.Router();

router.get("/", async (req, res)=>{
    try {
        const logItem = await Chart.findOne().sort({'_id':-1}).limit(1)

        res.status(201).json(logItem)
    } catch (err) {
        console.log(err)
    }    
})

router.get("/date", async (req, res)=> {
    const dateFrom = req.query.dateFrom;
    const dateTo = req.query.dateTo;

    try {

        const logItem = await Chart.find({createdAt:{$gte:new Date(dateFrom), $lte: new Date(dateTo)}}).sort({'createdAt':1})
        console.log(logItem)
        res.status(201).json(logItem)
    } catch (err) {
        res.status(401).json(err)
       
    }    
})

router.post("/", async (req, res)=>{
    const data = req.body;
    try {
        const logItem = new Chart(data)
        console.log(logItem) 
        await logItem.save()
        res.status(201).json(logItem)
    } catch (err) {
        console.log(err)
    }    
})

export default router;

