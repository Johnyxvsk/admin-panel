import { combineReducers } from 'redux'

import users from './users'
import orders from './orders'

import auth from './auth'



export default combineReducers({ users, orders, auth })