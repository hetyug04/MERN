import React, { Children, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'


const ProtectedRoute = ({children}) => {
  const user = localStorage.getItem('user')
  console.log(user)
  if(!user){
    return <Navigate to="/"></Navigate>
  }
  return children
}

export default ProtectedRoute
