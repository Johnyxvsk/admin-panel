import React from "react";
import { BrowserRouter,
Routes,
Route,
Navigate,
Switch
} from "react-router-dom"

import "./app.scss"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import List from "./pages/list/List"
import Single from "./pages/single/Single";
import Orders from "./pages/orders/Orders";
import Profile from "./pages/profile/Profile";
import ErrorPage from "./pages/ErrorPage";

import { GoogleOAuthProvider } from '@react-oauth/google';


const App = () => {
  const isAuthenticated = localStorage.getItem("profile");

  return ( 
    <div className="App">
      <GoogleOAuthProvider clientId="378489164016-ef35o6rgn327hjih8bdndf0c9t59hq54.apps.googleusercontent.com">
      <BrowserRouter>
    
        <Routes>
        
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" replace /> : <Login/>} />
          <Route path="/home" element={<Home/>} />

          <Route path="*" element={<ErrorPage/>}/>
         
        </Routes>
      </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
