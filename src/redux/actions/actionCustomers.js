import * as types from '../types'
import axios from 'axios'

export const getCustomer = (token) => ({
    type: types.CUSTOMER,
    payload: axios.get(`http://192.168.0.22:5000/api/v2/customers`, {
        headers: { "Authorization": `Bearer ${token}` }
    })
})

export const addCustomer = (params) => ({
    type: types.ADDCUSTOMER,
    payload: axios.post(`http://192.168.0.22:5000/api/v2/customers/add`, {
        name: params.name,
        id_card: params.idCard,
        phone_number: params.phoneNumber,
        image: '',
    })
})

export const detailCustomer = (params, token) => ({
    type: types.DETAILCUSTOMER,
    payload: axios.get(`http://192.168.0.22:5000/api/v2/customers/detail/${params}`, {
        headers: { "Authorization": `Bearer ${token}` }
    })
})

export const updateCustomer = (params) => ({
    type: types.UPDATECUSTOMER,
    payload: axios.put(`http://192.168.0.22:5000/api/v2/customers/edit/${params.id}`, {
        name: params.name,
        id_card: params.idCard,
        phone_number: params.phoneNumber
    })
})
