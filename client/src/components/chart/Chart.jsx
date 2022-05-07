import React, { useState, useEffect, useRef } from 'react';
import './chart.scss'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import DatePicker from "react-datepicker";
import Icon from "@material-ui/core/Icon";

import "react-datepicker/dist/react-datepicker.css";

import axios from 'axios'

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Status Motoristas',
      size: '200px'
    },
    zoom:{
      pan:{
        enabled: true,
        mode: 'x',
        threshold: 10,
      },

      mode: 'x',
        wheel:{
          enabled:true
        },
        drag:{
          enabled: true,
          backgroundColor: 'rgba(255, 20, 10, 0,3)',
          borderColor: 'rgb(255, 0, 0)',
          threshold: 100,
        }
     
    } 
  },

  scales: {
    'y':{
        type: 'linear',
        position: 'right',
        offset:true,
    },
    x:{
      suggestedMin: 50,
      suggestedMax: 100
    }
  }
};

let liveInterval = null;

const Chart = () => {
  const intervalRef = useRef();
  const chartRef = useRef(null);

  const dateFromRef = useRef(null);
  const dateToRef = useRef(null);

  const [emOpe, setEmOpe] = useState([])
  const [livres, setLivres] = useState([])
  const [emAnda, setEmAnda] = useState([])
  
  const [loadData, setLoadData] = useState([])

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [liveToggle, setLiveToggle] = useState(false)
 
  const test = () => {

    const dateFrom = dateFromRef.current;
    const dateTo = dateToRef.current;
   

    let now = new Date()
    //setStartDate(now)
    let check = new Date(startDate)

    let testDate = new Date('2022-05-05T23:35:41.777+00:00')
    
    
    console.log(loadData)
    //console.log(startDate.toUTCString())

  }
  const getChartData = async (check) => {
    try {
      let res = await axios.get('/api')
      if (!check) {
        let emOperaçao = { x: res.data.time, y: res.data.emOperaçao }
        let livres = { x: res.data.time, y: res.data.livres }
        let emAndamento = { x: res.data.time, y: res.data.emAndamento }


        setEmOpe( state => [...state, emOperaçao] )
        setLivres( state => [...state, livres] )
        setEmAnda( state => [...state, emAndamento] )
      }else{

        return res.data
        
      }
    } catch (err) {

      console.log(err)
    }
  }

  const getChartByDate = async () => {
    let data = {
      dateFrom: startDate.toString(),
      dateTo: endDate.toString()
    }

    let chart = chartRef.current;

    try {
      let res = await axios.get('/api/date', {params: data})
      if (!res.data.length) {

        let lastDate = await getChartData(true)
        let date = new Date(lastDate.createdAt)
        alert('Último item salvo: ' + date.toLocaleString())
      
        
      } else{
        console.log(chart.config.data)
        chart.config.data.datasets = res.data
        chart.update()
        //setLoadData(state => [...state, res.data])
        
          //for (const key in res.data) {

          //if (res.data.hasOwnProperty(key)) {

            // let time = res.data[key].time
            // let emOperaçao = { x: time, y: res.data[key].emOperaçao }
            // let livres = { x: time, y: res.data[key].livres }
            // let emAndamento = { x: time, y: res.data[key].emAndamento }
            // console.log(res.data.length)
            // setEmOpe( state => [...state, emOperaçao] )
            // setLivres( state => [...state, livres] )
            // setEmAnda( state => [...state, emAndamento] )
            //console.log(res.data[key])
         // }
        //}  
      } 
    } catch (err) {
      console.log(err)
    }
  }

  const dataset = {
    datasets: [
        {
            label: 'Em Operação',
            data: emOpe,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            yAxisID: 'y',

        },
        {
            label: 'Livres',
            data: livres,
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
    ],
  };

  // const toggleLive = () => {
    
  //   liveInterval = setInterval(() => {  
     
  //     console.log('get from interval')
  //     getChartData()
  //     if (!liveToggle) {
  //       clearInterval(liveInterval)
  //       console.log('cleared: ' + liveInterval)
  //     }
  //   }, 10000);

  // }

  // useEffect(() => {   
  //   return () => clearInterval(liveInterval)
  // }, []);


  const startCounter = () => {
    getChartData()
    intervalRef.current = setInterval(() => {
      getChartData()
    }, 30000);
    setLiveToggle(true);
    console.log('Status Live: ' + liveToggle)
  };

  const stopCounter = () => {
    clearInterval(intervalRef.current);
    setLiveToggle(false);
    console.log('Status Live: ' + liveToggle)
  };
  // useEffect(() => {
  //   let test = chartRef.current;
    
  //   test.update()
  //   console.log(test.data.datasets)
  // }, [loadData]);



  return (
    <div>
      <div className="chart">
          <div className="menu">
            <div className="left">
              <div className='datePicker'>
                <div  className='pickers'>
                  <div className="dates">
                      <div className="label">
                        <p>De:  </p>
                      </div>
                      <DatePicker ref={dateFromRef} 
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                      />
                      </div>
                      <div className="dates">

                      <div className="label">
                        <p>Até:  </p>
                      </div>
                      <DatePicker ref={dateToRef} 
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                      />
                      
                    </div>
                </div>
                  
                <div className='buttons'>
                  <Icon className="icon" onClick={getChartByDate}>query_stats</Icon>
                </div>
              </div> 
            </div>
            <div className="right">
              <div className="buttons">
              
                {liveToggle ? 
                  <div className='live' onClick={liveToggle ? stopCounter : startCounter}>
                    <Icon className="icon ativo" >update</Icon>
                    <p className="ativo">Auto</p>
                  </div> 
                  :
                  <div className='live' onClick={liveToggle ? stopCounter : startCounter}>
                    <Icon className="icon inativo">update_disabled</Icon>
                    <p className="inativo">Auto</p>
                  </div>
                }
              </div>
            </div>
            

          </div>
          <Line ref={chartRef} options={options} data={dataset} />
          
      </div>
    </div>

  )
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default Chart
