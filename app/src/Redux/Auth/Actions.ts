import * as types from './Types'
import Axios, { AxiosRequestConfig } from 'axios'
import { Dispatch } from 'redux'

export const register_request = () => {
  return {
    type: types.register_request
  }
}
export const register_success = (data: any) => {
  return {
    type: types.register_success,
    payload: data
  }
}
export const register_failure = (err: any) => {
  return {
    type: types.register_failure,
    payload: err
  }
}

export const login_request = () => {
  return {
    type: types.login_request
  }
}
export const login_success = (data: any) => {
  return {
    type: types.login_success,
    payload: data
  }
}
export const login_failure = (err: any) => {
  return {
    type: types.login_failure,
    payload: err
  }
}

export const logout_request = () => {
  return {
    type: types.logout_request
  }
}
export const logout_success = (data: any) => {
  return {
    type: types.logout_success,
    payload: data
  }
}
export const logout_failure = (err: any) => {
  return {
    type: types.logout_failure,
    payload: err
  }
}

export const Register = (data: object) => {
  let options: AxiosRequestConfig = {
    url: 'auth/register',
    method: 'post',
    headers: { 'Access-Control-Allow-Credentials': true },
    data: data
  }
  return async (dispatch: Dispatch) => {
    dispatch(register_request())
    try {
      const { data } = await Axios(options)
      dispatch(register_success(data))
    } catch (error) {
      dispatch(register_failure(error))
    }
  }
}
