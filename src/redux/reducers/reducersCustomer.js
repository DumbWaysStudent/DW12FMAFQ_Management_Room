import * as types from './../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    customers: [],
    addCustomer :[],
    detailCustomer :[]
};

export default  reducerCustomer = (state=initialState,action) =>{
    switch(action.type){
        case `${types.CUSTOMER}_PENDING`:
            return{
                ...state,
                isLoading: true
            }
        case `${types.CUSTOMER}_FULFILLED`:
            return{
                ...state,
                isLoading: false,
                isSuccess: true,
                customers: action.payload.data
            }
        case `${types.CUSTOMER}_REJECTED`:
            return{
                ...state,
                isError:true,
                isLoading:false
            }
            case `${types.ADDCUSTOMER}_PENDING`:
                return{
                    ...state,
                    isAddLoading: true
                }
            case `${types.ADDCUSTOMER}_FULFILLED`:
                return{
                    ...state,
                    isAddLoading: false,
                    isAddSuccess: true,
                    addCustomer: action.payload.data
                }
            case `${types.ADDCUSTOMER}_REJECTED`:
                return{
                    ...state,
                    isAddError:true,
                    isAddLoading:false
                }
                case `${types.DETAILCUSTOMER}_PENDING`:
                    return{
                        ...state,
                        isAddLoading: true
                    }
                case `${types.DETAILCUSTOMER}_FULFILLED`:
                    return{
                        ...state,
                        isAddLoading: false,
                        isAddSuccess: true,
                        detailCustomer: action.payload.data
                    }
                case `${types.DETAILCUSTOMER}_REJECTED`:
                    return{
                        ...state,
                        isAddError:true,
                        isAddLoading:false
                    }           
        default :
            return state;
    }
  }
