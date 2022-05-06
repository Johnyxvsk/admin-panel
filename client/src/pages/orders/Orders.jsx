import React, {useEffect, useState} from 'react'

import "./orders.scss"

import MaterialTable from 'material-table'

import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import {ordersColumns} from '../../utils/gridColumns/gridColumns'

import { useDispatch } from "react-redux";
import { updateOrder } from '../../actions/orders'


const Orders = () => {
  const [orders, setOrders] = useState([])
  const dispatch = useDispatch();

  const getStorage = () =>{
    const data = localStorage.getItem('orders')
    if (data) {
      setOrders(JSON.parse(data))
    }else{
      console.log('no orders in local storage')
    }
  }

  useEffect(()=>{
    getStorage()
  },[]);

  const test = () =>{
    console.log(orders)
   
  }

  const updateOrdertDB = async (id, data) => {
    let test = await dispatch(updateOrder(id, data))
    console.log(test)
  }

  const handleRowUpdate = (newData, oldData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const dataUpdate = [...orders];
        // In dataUpdate, find target
        const target = dataUpdate.find((el) => el._id === oldData._id);
        const index = dataUpdate.indexOf(target);
        console.log(target._id)
        console.log(newData)
        dataUpdate[index] = newData;
        setOrders([...dataUpdate]);

        updateOrdertDB(target._id, newData)

        resolve();
      }, 1000);
    });
  }
 
  return (
    <div className='list'>
      <Sidebar/>
      <div className="listCont">
        <Navbar/>
        <button onClick={test}>test</button>
        <MaterialTable
          columns={ordersColumns}
          data={orders}
          options={{
            filtering:true
          }}
          detailPanel={({rowData}) => {
            return (
              <div
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  height: 100
                }}
              >
                This is a detailed panel for {rowData }
              </div>
            )
          }}
          editable={{
            onRowUpdate: handleRowUpdate,
          }}
          />

      </div>
    </div>
  )
}

export default Orders;