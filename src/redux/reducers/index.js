import { combineReducers } from 'redux';


import reducerAuthentication from './reducersAuthentication'
import reducersRooms from './reducersRooms'
import reducersOrders from './reducersOrders'
import reducersCustomer from './reducersCustomer';


const appReducer = combineReducers({
  authentication : reducerAuthentication,
  rooms :reducersRooms,
  orders : reducersOrders,
  customers : reducersCustomer
})

export default appReducer