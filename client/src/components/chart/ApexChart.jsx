import React, {useState, useEffect} from 'react';
import Chart from 'react-apexcharts'
import axios from 'axios'
import './apexChart.scss'

const ApexChart = () => {
    const [options, setoptions] = useState({
        chart:{
            animations: {
                enabled: false,
            },
            type: 'line',
        },
        xaxis:{
            type:'datetime'
        },
        dataLabels: {
            enabled: false
          },
          markers: {
            size:0
          }
      });
    const [series, setseries] = useState([{data: []}]);

    useEffect(() => {
        
        const getToday = async () =>{
            let today = new Date();
            let rightNow = new Date();
            today.setHours(7,30,0,0);
            // today.setMonth(4)
            // rightNow.setMonth(5)
            let data = {
              dateFrom: today.toString(),
              dateTo: rightNow.toString()
            }
            let res = await axios.get('/api/date', {params: data})
         
            // const chartData = res.data.filter((item)=>{
            //     if(item.label === 'Em Operação' || item.label === 'Livres' || item.label === 'Em Andamento'){
            //     return item
            // }else return null
            // })
            
            let emOpe = [];
            let livres = [];
            let emAnda = [];

            // res.data.map((item)=>{
            //     let currDate = item.createdAt;
            //     console.log('teszt')
            //     for (const key in item) {
            //         if (Object.hasOwnProperty.call(item, key)) {
            //             const element = item[key];
            //             switch (key) {
            //                 case 'emOperaçao':
            //                     emOpe.push({x: currDate, y: element})
            //                     break;
            //                 case 'livres':
            //                     livres.push({x: currDate, y: element})
            //                     break;
            //                 case 'emAndamento':
            //                     emAnda.push({x: currDate, y: element})
            //                     break;
            //                 default:
            //                     break;
            //             }
            //         }
            //     }
                
            // })
            // let emOpe = chartData[0].data;
            // let livre = chartData[1].data;
            // let emAnda = chartData[2].data;
            let dados = [
                {
                    name: 'Em Operação',
                    data: emOpe
                },
                {
                    name: 'Livres',
                    data: livres
                },
                {
                    name: 'Em Andamento',
                    data: emAnda
                },
            ];
            console.log(res.data)
            setseries(res.data)
        }
        getToday()

    }, []);

  return (
        <div className='apexChart'>
            <Chart options={options} series={series} type="line" width="800"/>
        </div>
  )
}

export default ApexChart