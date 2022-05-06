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


const Chart = () => {
  const chartRef = useRef(null);

  const test = () => {
    const chart = chartRef.current;
    chart.config.options.scales.x.suggestedMax = 20;
    console.log(chart.config.options.scales.x.grid.color)
    chart.update();
    
  }
  const [emOpe, setEmOpe] = useState([])
  const [livres, setLivres] = useState([])
  const [emAnda, setEmAnda] = useState([])

  const [liveToggle, setLiveToggle] = useState(false)

  const getChartData = async () => {
    try {
      let res = await axios.get('/api')

      let emOperaçao = { x: res.data.time, y: res.data.emOperaçao }
      let livres = { x: res.data.time, y: res.data.livres }
      let emAndamento = { x: res.data.time, y: res.data.emAndamento }


      setEmOpe( state => [...state, emOperaçao] )
      setLivres( state => [...state, livres] )
      setEmAnda( state => [...state, emAndamento] )
      console.log(res.data)
    } catch (err) {

      console.log(err)
    }
  }

  const getChartByDate = async () => {
    try {
      let data = {
        dateFrom: "2022-05-05T16:47:02.253+00:00",
        dateTo: "2022-05-05T23:35:41.777+00:00"
      }
      let res = await axios.get('/api/date', {params: data})      
      for (const key in res.data) {

        if (res.data.hasOwnProperty(key)) {

          let time = res.data[key].time
          let emOperaçao = { x: time, y: res.data[key].emOperaçao }
          let livres = { x: time, y: res.data[key].livres }
          let emAndamento = { x: time, y: res.data[key].emAndamento }
          console.log(res.data.length)
          setEmOpe( state => [...state, emOperaçao] )
          setLivres( state => [...state, livres] )
          setEmAnda( state => [...state, emAndamento] )
        }
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
  const toggleLive = () => {
    !liveToggle ? setLiveToggle(true) : setLiveToggle(false)

    console.log(liveToggle)
  }

  useEffect(() => {
    if (liveToggle) {
      getChartData()
      setInterval(() => {
        getChartData()
      }, 30000);
    }else{
      console.log('not live')
    }
    

  }, [liveToggle]);



  return (
    <div>
      <button onClick={getChartByDate}> test </button>
      <button onClick={test}> other test </button>
      <button onClick={toggleLive}> toggleLive </button>

      <div className="chart">
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
