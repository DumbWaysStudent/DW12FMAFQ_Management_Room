import * as types from '../types'

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,

  isAddLoading: false,
  isAddError: false,
  isAddSuccess: false,

  rooms: [],
  addRooms: [],
  detailRooms: []
};

const reducerGetRooms = (state = initialState, action) => {
  switch (action.type) {
    case `${types.ROOMS}_PENDING`:
      return {
        ...state,
        isLoading: true
      }
    case `${types.ROOMS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        rooms: action.payload.data
      }
    case `${types.ROOMS}_REJECTED`:
      return {
        ...state,
        isError: true,
        isLoading: false
      }
    case `${types.ADDROOMS}_PENDING`:
      return {
        ...state,
        isAddLoading: true
      }
    case `${types.ADDROOMS}_FULFILLED`:
      return {
        ...state,
        isAddLoading: false,
        isAddSuccess: true,
        addRooms: action.payload.data
      }
    case `${types.ADDROOMS}_REJECTED`:
      return {
        ...state,
        isAddError: true,
        isAddLoading: false
      }
    case `${types.DETAILROOMS}_PENDING`:
      return {
        ...state,
        isAddLoading: true
      }
    case `${types.DETAILROOMS}_FULFILLED`:
      return {
        ...state,
        isAddLoading: false,
        isAddSuccess: true,
        detailCustomer: action.payload.data
      }
    case `${types.DETAILROOMS}_REJECTED`:
      return {
        ...state,
        isAddError: true,
        isAddLoading: false
      }
    default:
      return state;
  }

}

export default reducerGetRooms