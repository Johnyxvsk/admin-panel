import React, { useState, useEffect, useRef } from 'react';
import './chart.scss'
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  TimeSeriesScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import DatePicker from "react-datepicker";
import Icon from "@material-ui/core/Icon";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'


export const options = {
  responsive: true,
  spanGaps: true,
  tension: 0.2, 
  responsiveAnimationDuration: 0, // animation duration after a resize
  animation: {
    duration: 0 // general animation time
    },
    hover: {
        animationDuration: 0 // duration of animations when hovering an item
    },   
  plugins: {
    title: {
      display: true,
      text: 'Status Motoristas',
      font: {
        size: 20,
        family:"'Source Sans Pro', sans-serif",
      },
      padding: {
          top: 10,
      }
    },
    legend:{

      labels:{

        boxWidth:35,
        boxHeight:35,
        color: 'rgb(100, 100, 100)',
        font:{
          size: 14,
          weight:'bold',
        },
        filter: function(item, chart) {
          // Logic to remove a particular legend item goes here
          const conditions = ["Temp", "Precipitação"];
          //!item.text.includes('Temp');
          return !conditions.some(el => item.text.includes(el)); 
        },
      },
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

    },
    filler: {
      propagate: true
    }
  },
  datasets: {
  
    line: {
      //borderWidth: 5,
      pointRadius: 0, // disable for all `'line'` datasets
    },
    

  },
 
  scales: {
    x:{
      type: 'time',
      ticks:{
        callback: function(val, index) {
          // Hide the label of every 2nd dataset
          //console.log(index)
          return val
        },
        major:{
          enabled:true
        },
        font: (ctx)=>{
          const boldTicks = ctx.tick && ctx.tick.major ? 'bold' : '';
          return { weight: boldTicks}
        },
        
      }
    },
    'y':{
      type: 'linear',
      position: 'right',
      offset:true,
    },
    'y-temp':{
      display:true,
      type: 'linear',
      position: 'left',
      offset:true,
      
      grid:{
        display: false
      }
    }
    
  }
};
 const optionsWeather = {responsive: true,
  maintainAspectRatio: false,
  tension: 0.2,

  responsiveAnimationDuration: 0, // animation duration after a resize
  animation: {
    duration: 0 // general animation time
    },
    hover: {
        animationDuration: 0 // duration of animations when hovering an item
    },   
  datasets: {
    line: {
      pointRadius: 0, // disable for all `'line'` datasets
    }
  },
  plugins:{
    legend:{
      display: false,

    }
  }
  ,
  scales: {
    x:{
      type: 'time',
      ticks:{
        callback: function(val, index) {
          // Hide the label of every 2nd dataset
          //console.log(index)
          return val
        },
        major:{
          enabled:true
        },
        font: (ctx)=>{
          const boldTicks = ctx.tick && ctx.tick.major ? 'bold' : '';
          return { weight: boldTicks}
        },
        
      }
    },
    
    'y-temp':{
      type: 'linear',
      position: 'right',
      offset:true,
      ticks:{
        callback: function(val, index) {
          // Hide the label of every 2nd dataset
          //console.log(index)
          return val + "ºc";
        },
      },
      grid:{
        display: false
      }
    },
    'y-precipita':{
     display:true,
     position: 'left',
      grid:{
        display: false
      }
    },
    
  }
};

const Chart = () => {
  const intervalRef = useRef();
  const chartRef = useRef(null);
  const weatherRef = useRef(null);
  
  const dateFromRef = useRef(null);
  const dateToRef = useRef(null);

  const [emOpe, setEmOpe] = useState()
  const [livres, setLivres] = useState()
  const [emAnda, setEmAnda] = useState()

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [lastUpdate, setLastUpdate] = useState();
  const [today, setTodaysData] = useState(true)
  const [chartData, setchartData] = useState({datasets:[]})
  const [liveToggle, setLiveToggle] = useState(false)

  

  const getChartData = async (check) => {
    try {
      let res = await axios.get('/api')
      if (!check) {
        let createdAt =  new Date(res.data.logItem.createdAt)
        setLastUpdate(createdAt.toLocaleTimeString())
        let emOperaçao = { x:createdAt , y: res.data.logItem.emOperaçao }
        let livres = { x: createdAt, y: res.data.logItem.livres }
        let emAndamento = { x: createdAt, y: res.data.logItem.emAndamento }
        
        for (const key in chartRef.current.data.datasets) {
          if (Object.hasOwnProperty.call(chartRef.current.data.datasets, key)) {
              const obj = chartRef.current.data.datasets[key];
              if (obj.label === 'Em Operação') {
                let check = res.data.logItem.emOperaçao;
                if (check.length === 1) {
                  check.toString()
                  check = "0" + check;
                  parseInt(check)
                  setEmOpe(check)
                  obj.data.push(emOperaçao)

                }else{
                  setEmOpe(res.data.logItem.emOperaçao)
                  obj.data.push(emOperaçao)
                }


              }else if(obj.label === 'Livres'){
                let check = res.data.logItem.livres;
                if (check.length === 1) {
                  check.toString()
                  check = "0" + check;
                  parseInt(check)
                  setLivres(check)
                  obj.data.push(livres)

                }else{
                  setLivres(res.data.logItem.livres)
                  obj.data.push(livres)
                }



              }else if(obj.label === 'Em Andamento'){

                let check = res.data.logItem.emAndamento;
                if (check.length === 1) {
                  check.toString()
                  check = "0" + check;
                  parseInt(check)
                  setEmAnda(check)
                  obj.data.push(emAndamento)

                }else{
                  setEmAnda(res.data.logItem.emAndamento)
                  obj.data.push(emAndamento)
                }

              }
              chartRef.current.update();
          }
      }
      
     
      }else{
        return res.data.logItem
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
    setTodaysData(false)
    try {
      let res = await axios.get('/api/date', {params: data})
      if (!res.data.length) {
        let lastDate = await getChartData(true)
        let date = new Date(lastDate.createdAt)
        alert('Último item salvo: ' + date.toLocaleString())
      } else{
        const weather = res.data.filter((item)=> {
          if(item.label === 'Temp' || item.label === 'Precipitação'){
              return item
          }else return null
        } )
  
        const chartData = res.data.filter((item)=>{
          if(item.label === 'Em Operação' || item.label === 'Livres' || item.label === 'Em Andamento'){
            return item
        }else return null
      })
  
        chartRef.current.data.datasets = chartData;
  
        weatherRef.current.data.datasets = weather;
  
  
        
        weatherRef.current.update()
        chartRef.current.update()
      }
    } catch (err) {
      console.log(err)
    }
  }
  // function test(){
  //   // const bgColor = {
  //   //   id:"bgColor",
  //   //   afterDatasetsDraw(chart, args, pluginOptions){
  //   //     const {ctx, data, scales:{x,y} }=chart;

  //   //     console.log(ctx.p0)
     

  //   //   }
  //   // }
  //   // chartRef.current.config.plugins.push(bgColor)

  //   chartRef.current.config.data.datasets[3].fill = true;
  //   chartRef.current.config.data.datasets[3].fill = true;
    
  //   chartRef.current.config.data.datasets[3].backgroundColor = 'rgba(0, 0, 248, 0.5)';
    
  //   console.log(chartRef.current.config.data.datasets)
  //   chartRef.current.update()

  // }

  

  useEffect(() => {
    setchartData({datasets:[]})
    const getToday = async () =>{
      let today = new Date();
      let rightNow = new Date()
      today.setHours(7,30,0,0)
      let data = {
        dateFrom: today.toString(),
        dateTo: rightNow.toString()
      }
      let res = await axios.get('/api/date', {params: data})

      const weather = res.data.filter((item)=> {
        if(item.label === 'Temp' || item.label === 'Precipitação'){
            return item
        }else return null
      } )

      const chartData = res.data.filter((item)=>{
        if(item.label === 'Em Operação' || item.label === 'Livres' || item.label === 'Em Andamento'){
          return item
      }else return null
    })

      chartRef.current.data.datasets = chartData;
      weatherRef.current.data.datasets = weather;
      
      weatherRef.current.update()
      chartRef.current.update()
    }
    if(today){
      getToday()
      
    }


  }, [today]);

  const startCounter = () => {
    getChartData(false)
    intervalRef.current = setInterval(() => {
      getChartData(false)
    }, 30000);
    setLiveToggle(true);
  };

  const stopCounter = () => {
    clearInterval(intervalRef.current);
    setLiveToggle(false);
  };

  
  // const getDatasetAtEvent = (chartref, event) => {
  //     console.log(event)
  // }
  // const getElementAtEvent = (chartref, event) => {
  //   console.log(event)
  // }
  // const getElementsAtEvent = (chartref, event) => {
  //   console.log(event)
  // }

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
            <div className="middle">
              <div className='emOpe'>
                <p className="ativo">{emOpe}</p>
              </div>
              <div className='livres'>
                <p className="ativo">{livres}</p>
              </div>
              <div className='emAnda'>
                <p className="ativo">{emAnda}</p>
              </div>
            </div>
            <div className="right">
              <div className="buttons">

                {liveToggle ?
                  <div className='live' onClick={liveToggle ? stopCounter : startCounter}>
                    <div className='buttons'>
                      <Icon className="icon ativo" >update</Icon>
                      <p className="ativo">Auto</p>
                    </div>
                  
                      <p className=" lastUpdate ativo">{lastUpdate}</p>
                    
                  </div>
                  :
                  <div className='live' onClick={liveToggle ? stopCounter : startCounter}>
                    <div className="buttons">
                    <Icon className="icon inativo">update_disabled</Icon>
                    <p className="inativo">Auto</p>
                    </div>
                  </div>
                }
                <div className='metrics'>
                
                   <p> Disp.: {emOpe ? Math.floor((livres/emOpe)*100).toString() + "%" : ' ' }</p> 

                </div>
              </div>
              
            </div>


          </div>
          <Line ref={chartRef} options={options}
          data={chartData}
          // onClick={(event) => {
          //   getDatasetAtEvent(chartRef.current, event);
          //   getElementAtEvent(chartRef.current, event);
          //   getElementsAtEvent(chartRef.current, event);
          // }}
          />
          <div className="WeatherChart">
            <Line ref={weatherRef} options={optionsWeather}
            data={chartData}
            />
          </div>

        {/* <WeatherChart ref={weatherRef} WeatherData={chartData}/> */}
      </div>
    </div>

  )
}

ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  TimeSeriesScale,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export default Chart
