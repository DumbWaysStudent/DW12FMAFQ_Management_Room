import * as types from './../types'
import axios from 'axios'

export const getOrders = (token, idRoom) => ({
    type: types.ORDERS,
    payload: axios.get(`http://192.168.0.22:5000/api/v2/orders/check/${idRoom}`, {
        headers: { "Authorization": `Bearer ${token}` }
    })
})