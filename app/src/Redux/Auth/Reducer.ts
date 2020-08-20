import * as types from './Types'

const AuthState = {
  registerRes: [],
  registerLoading: false,
  registerLoaded: false,
  registerError: '',

  loginRes: [],
  loginLoading: false,
  loginLoaded: false,
  loginError: '',

  logoutRes: [],
  logoutLoading: false,
  logoutLoaded: false,
  logoutError: ''
}

const AuthReducer = (state = AuthState, action: any) => {
  switch (action.type) {
    case types.register_request:
      return {
        ...state,
        registerLoading: true
      }
    case types.register_success:
      return {
        ...state,
        registerRes: action.payload,
        registerLoading: false,
        registerLoaded: true
      }
    case types.register_failure:
      return {
        ...state,
        registerLoading: false,
        registerError: action.payload
      }

    case types.login_request:
      return {
        ...state,
        loginLoading: true
      }
    case types.login_success:
      return {
        ...state,
        loginRes: action.payload,
        loginLoading: false,
        loginLoaded: true
      }
    case types.login_failure:
      return {
        ...state,
        loginrLoading: false,
        loginError: action.payload
      }

    case types.logout_request:
      return {
        ...state,
        logoutLoading: true
      }
    case types.logout_success:
      return {
        ...state,
        logoutRes: action.payload,
        logoutLoading: false,
        logoutLoaded: true
      }
    case types.logout_failure:
      return {
        ...state,
        logoutLoading: false,
        logoutError: action.payload
      }
    default:
      return state
  }
}

export default AuthReducer
