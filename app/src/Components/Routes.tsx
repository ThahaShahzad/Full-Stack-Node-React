import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SignUp from './Screens/Auth/SignUp'
import Login from './Screens/Auth/Login'
import Home from './Screens/Home/Home'
import Error from './Error'
import Header from './Screens/Header/Header'

const Routes: React.FC = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/login' component={Login} exact />
        <Route path='/signup' component={SignUp} exact />
        <Route component={Error} />
      </Switch>
    </>
  )
}

export default Routes
