import React from "react";
import { 
Routes,
Route,
Navigate
} from "react-router-dom"

import "./app.scss"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
// import List from "./pages/list/List"
// import Single from "./pages/single/Single";
import Orders from "./pages/orders/Orders";
import Profile from "./pages/profile/Profile";
import ErrorPage from "./pages/ErrorPage";

import { AuthProvider } from "./hooks/useAuth";

import { ProtectedLayout } from "./components/protectedRoutes/ProtectedLayout";
import { HomeLayout } from "./components/protectedRoutes/HomeLayout";

const App = () => {
    
  //const isAuthenticated = localStorage.getItem("profile");

  return ( 
    <div className="App">

            <Routes>
              <Route element={<HomeLayout />}>
                <Route path="/" element={<Login />} />
                <Route path="*" element={<ErrorPage/>}/>
              </Route>

              <Route element={<ProtectedLayout />}>
                <Route path="/home" element={<Home />} />
                <Route path="profile" element={<Profile />} />
                <Route path="orders" element={<Orders />} />
              </Route>
              
            </Routes>

    </div>
  );
}

export default App;
