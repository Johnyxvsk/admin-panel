import express from 'express';
import Chart from '../models/Chart.js'
import Temp from '../models/Temp.js'

const router = express.Router();

router.get("/", async (req, res)=>{
    try {
        const logItem = await Chart.findOne().sort({'_id':-1}).limit(1)
        const tempItem = await Temp.findOne().sort({'_id':-1}).limit(1)
        
        let test = {logItem, tempItem}

        res.status(201).json(test)
    } catch (err) {
        console.log(err)
    }    
})

router.get("/date", async (req, res)=> {
    const dateFrom = req.query.dateFrom;
    const dateTo = req.query.dateTo;
    
    try {
        const logItem = await Chart.find({createdAt:{$gte:new Date(dateFrom), $lte: new Date(dateTo)}}).sort({'createdAt':1})
        const tempItem = await Temp.find({createdAt:{$gte:new Date(dateFrom), $lte: new Date(dateTo)}}).sort({'createdAt':1})
        
        let emOpe = [];
        let livre = [];
        let emAnda = [];
        let tempData = [];
        let precipitaData = [];
        let datasets = [];
        for (const key in logItem) {
            if (Object.hasOwnProperty.call(logItem, key)) {
                const element = logItem[key];
                let createdAt = new Date(element.createdAt)

                emOpe.push({x: createdAt, y: element.emOperaçao})
                livre.push({x: createdAt, y: element.livres})
                emAnda.push({x: createdAt, y: element.emAndamento})
                
            }
        }
        console.log(tempItem)
        for (const key in tempItem) {
            if (Object.hasOwnProperty.call(tempItem, key)) {
                const test = tempItem[key];
                let createdAt = new Date(test.createdAt)
                tempData.push({x: createdAt, y: test.temp.toString().slice(0,-2)})
                precipitaData.push({x: createdAt, y: test.precipita.toString().slice(0, -2) })
            }
        }
        datasets = [
            {
                label: 'Em Operação',
                data: emOpe,
                borderColor: 'rgb(116, 81, 248)',
                yAxisID: 'y',
    
            },
            {
                label: 'Livres',
                data: livre,
                borderColor: 'rgb(13, 194, 4)',
                yAxisID: 'y',
            },
            {
                label: 'Em Andamento',
                data: emAnda,
                borderColor: 'rgb(255, 111, 0)',
                yAxisID: 'y',
    
            },
            {
                label: 'Temp',
                data: tempData,
                borderColor: 'rgb(200, 40,20)',

                backgroundColor: 'rgba(200, 40,20, 0.9)',
                yAxisID: 'y-temp',
    
            },
            {
                label: 'Precipitação',
                data: precipitaData,
                type: 'bar',
                fill: true,  
                barThickness: 10,
              
                backgroundColor: 'rgba(0, 33,  250, 0.8)',
                yAxisID: 'y-precipita',
    
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
        await logItem.save()
        res.status(201).json(logItem)
    } catch (err) {
        console.log(err)
    }    
})
router.post("/temp", async (req, res)=>{
    const data = req.body;
    try {
        const logItem = new Temp(data)
        await logItem.save()
        res.status(201).json(logItem)
    } catch (err) {
        console.log(err)
    }    
})

export default router;

