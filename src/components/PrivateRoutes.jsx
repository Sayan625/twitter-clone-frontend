import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import SignIn from '../pages/SignIn'

const PrivateRoutes = () => {
    const user=useSelector((state)=>state.user.current)
  return (
    user?.token? <Outlet/> : <SignIn/>
  )
}

export default PrivateRoutes