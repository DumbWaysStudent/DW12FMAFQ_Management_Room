import * as types from '../types'
import axios from 'axios'

export const getCheckin = (token) => ({
  type: types.ORDERS,
  payload: axios.get(`http://192.168.0.22:5000/api/v2/orders/checkin`, {
    headers: { "Authorization": `Bearer ${token}` }
  })
})

export const checkinOrder = (params) => ({
  type: types.ADDORDER,
  payload: axios({
    method: 'post',
    url: `http://192.168.0.22:5000/api/v2/orders/add`,
    data: params.data,
    headers: {
      Authorization: `Bearer ${params.token}`
    }
  })
})

// export const updateOrders = (params) => ({
//   type: types.UPDATEORDERS,
//   payload: axios.put(`http://192.168.0.22:5000/api/v2/customers/edit/${params.id}`, {
//     room_name: params.name,
//     customer: params.customer,
//     duration: params.duration,
//   })
// })

export const checkoutOrder = (params) => ({
  type: types.ORDERCHECKOUT,
  payload: axios({
    method: 'put',
    url: `http://192.168.0.22:5000/api/v2/orders/edit/${params.id}`,
    data: params.data,
    headers: {
      Authorization: `Bearer ${params.token}`
    }
  })
})

export const getRoomOrder = (params) => ({
  type: types.DETAILROOMORDER,
  payload: axios.get(`http://192.168.0.22:5000/api/v2/orders/checkroom/${params}`, {
  })
})

// export const getOrderfalse = (token) => ({
//     type: types.ORDERS,
//     payload: axios.get(`http://192.168.0.22:5000/api/v2/orders/check`)
// })