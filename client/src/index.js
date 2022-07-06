import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom"
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { AuthProvider } from "./hooks/useAuth";
import { GoogleOAuthProvider } from '@react-oauth/google';

import reducers from './reducers'

import App from './App';

const store = createStore(reducers, compose(applyMiddleware(thunk)))


ReactDOM.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="378489164016-ef35o6rgn327hjih8bdndf0c9t59hq54.apps.googleusercontent.com">
      <Provider store={store}>

        <AuthProvider>
            <App />
        </AuthProvider>
      
      </Provider>
    </GoogleOAuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
  
);
