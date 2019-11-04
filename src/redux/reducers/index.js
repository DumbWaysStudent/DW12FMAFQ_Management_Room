import { combineReducers } from 'redux';
import reducerAuthentication from './reducerAuthentications'
import reducersRoom from './reducerRooms'
import reducersOrder from './reducerOrders'
import reducersCustomer from './reducerCustomers';


const appReducer = combineReducers({
  authentication: reducerAuthentication,
  rooms: reducersRoom,
  orders: reducersOrder,
  customers: reducersCustomer
})

export default appReducer