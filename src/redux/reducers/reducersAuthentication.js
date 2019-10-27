import * as types from './../types'

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  user: []
};
const reducerLogin = (state = initialState, action) => {
  switch (action.type) {
    case `${types.LOGIN}_PENDING`:
      return {
        ...state,
        isLoading: true
      }
    case `${types.LOGIN}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        user: action.payload.data
      }
    case `${types.LOGIN}_REJECTED`:
      return {
        ...state,
        isError: true,
        isLoading: false
      }
    default:
      return state;
  }
}
export default reducerLogin