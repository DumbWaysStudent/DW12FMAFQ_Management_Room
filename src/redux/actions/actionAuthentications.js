import * as types from '../types'
import axios from 'axios'

export const login = (inputUsername, inputPassword) => ({
  type: types.LOGIN,
  payload: axios.post('http://192.168.0.22:5000/api/v2/login', {
    email: inputUsername,
    password: inputPassword
  })
})

export const setting = (inputUsername, inputPassword) => ({
  type: types.LOGIN,
  payload: axios.get('http://192.168.0.22:5000/api/v2/login', {
    email: inputUsername,
    password: inputPassword
  })
})