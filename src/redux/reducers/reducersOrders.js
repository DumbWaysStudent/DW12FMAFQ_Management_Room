import * as types from './../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    orders: []
};

export default  reducerOrders = (state=initialState,action) =>{
    switch(action.type){
        case `${types.ORDERS}_PENDING`:
            return{
                ...state,
                isLoading: true
            }
        case `${types.ORDERS}_FULFILLED`:
            return{
                ...state,
                isLoading: false,
                isSuccess: true,
                orders: action.payload.data
            }
        case `${types.ORDERS}_REJECTED`:
            return{
                ...state,
                isError:true,
                isLoading:false
            }
        default :
            return state;
    }
  }
