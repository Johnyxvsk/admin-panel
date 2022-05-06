import React, {useEffect} from "react";
import { BrowserRouter,
Routes,
Route,
} from "react-router-dom"

import "./app.scss"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import List from "./pages/list/List"
import Single from "./pages/single/Single";
import Orders from "./pages/orders/Orders";
import Profile from "./pages/profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import {getOrders} from './actions/orders'


const App = () => {
  const ordersState = useSelector(state => state.orders)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders())

  }, [dispatch]);

  useEffect(()=>{
    const curOrders = localStorage.getItem('orders')
    if(!curOrders){
      setTimeout(() => {
        localStorage.setItem('orders', JSON.stringify(ordersState))
      }, 2000);
    }
  },[ordersState])
  

  return ( 
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home/>}/>
            <Route path="login" element={<Login/>} />
            <Route exact path="users">
              <Route index element={<List/>}/>
              <Route path=':id' element={<Single/>}/>
            </Route>
            <Route exact path="orders">
              <Route index element={<Orders/>}/>
            </Route>
            <Route exact path="profile" element={<Profile/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
