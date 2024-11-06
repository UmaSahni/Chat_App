import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

const PrivateRoute = ({children}) => {
    const  token  = localStorage.getItem("token")
    
    if(!token) return <Navigate to={"/auth"} />
  
    return children
}

export default PrivateRoute