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
        
        let emOpe = [];
        let livre = [];
        let emAnda = [];
        let datasets = [];
        for (const key in logItem) {
            if (Object.hasOwnProperty.call(logItem, key)) { 
                const element = logItem[key];
                emOpe.push({x: element.time, y: element.emOperaçao})
                livre.push({x: element.time, y: element.livres})
                emAnda.push({x: element.time, y: element.emAndamento})
            }
        }
        datasets = [
            {
                label: 'Em Operação',
                data: emOpe,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y',
    
            },
            {
                label: 'Livres',
                data: livre,
                borderColor: 'rgb(0, 255, 50)',
                backgroundColor: 'rgba(0, 255, 50, 0.5)',
                yAxisID: 'y',
    
            },
            {
                label: 'Em Andamento',
                data: emAnda,
                borderColor: 'rgb(116, 81, 248)',
                backgroundColor: 'rgba(116, 81, 248, 0.5)',
                yAxisID: 'y',
    
            },
        ]    
        
        res.status(201).json(datasets)
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

