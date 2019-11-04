import * as types from '../types'
import axios from 'axios'

export const getRooms = (token) => ({
  type: types.ROOMS,
  payload: axios.get(`http://192.168.0.22:5000/api/v2/rooms`, {
    headers: { "Authorization": `Bearer ${token}` }
  })
})

export const addRooms = (params) => ({
  type: types.ADDROOM,
  payload: axios.post(`http://192.168.0.22:5000/api/v2/rooms/add`, {
    name: params,
    available: true
  })
})

export const detailRooms = (params, token) => ({
  type: types.DETAILROOM,
  payload: axios.get(`http://192.168.0.22:5000/api/v2/rooms/detail/${params}`, {
    headers: { "Authorization": `Bearer ${token}` }
  })
})

export const updateRooms = (params) => ({
  type: types.UPDATEROOM,
  payload: axios.put(`http://192.168.0.22:5000/api/v2/rooms/edit/${params.id}`, {
    name: params.name,
  })
})