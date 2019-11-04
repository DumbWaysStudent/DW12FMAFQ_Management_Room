import * as types from '../types'

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  orders: [],
  detailRoomOrder: [],
  orderCheckIn: [],
  orderCheckOut: [],
};

export default reducerOrders = (state = initialState, action) => {
  switch (action.type) {
    case `${types.ORDERS}_PENDING`:
      return {
        ...state,
        isLoading: true
      }
    case `${types.ORDERS}_FULFILLED`:
      console.log(action.payload.data)
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        orders: action.payload.data
      }
    case `${types.ORDERS}_REJECTED`:
      return {
        ...state,
        isError: true,
        isLoading: false
      }
    case `${types.DETAILROOMORDER}_PENDING`:
      return {
        ...state,
        isLoading: true
      }
    case `${types.DETAILROOMORDER}_FULFILLED`:
      console.log(action.payload.data)
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        detailRoomOrder: action.payload.data
      }
    case `${types.DETAILROOMORDER}_REJECTED`:
      return {
        ...state,
        isError: true,
        isLoading: false
      }
    case `${types.ADDORDER}_PENDING`:
      return {
        ...state,
        isLoading: true
      }
    case `${types.ADDORDER}_FULFILLED`:
      let index = state.orders.findIndex(x => x.id == action.payload.data.body.room_id);
      state.orders[index].order = action.payload.data.body;
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      }
    case `${types.ORDERCHECKOUT}_PENDING`:
      return {
        ...state,
        isLoading: true
      }
    case `${types.ORDERCHECKOUT}_FULFILLED`:
      return {
        ...state,
        orderCheckOut: action.payload.data,
        isLoading: false,
        isSuccess: true,
      }
    case `${types.ORDERCHECKOUT}_REJECTED`:
      return {
        ...state,
        isError: true,
        isLoading: false
      }
    default:
      return state;
  }
}
