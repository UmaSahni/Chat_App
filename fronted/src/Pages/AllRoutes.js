import React from 'react'
import{Routes, Route} from "react-router-dom"
import Home from './Home'
import Chat from './Chat'
import Auth from './Auth'
import PrivateRoute from './PrivateRoute'
const AllRoutes = () => {
  return (
    <div>
        <Routes>
        <Route path='/' element={<Auth/>} />
        <Route path='/chat' element={<PrivateRoute><Chat/></PrivateRoute> } />
        <Route path='/auth' element={<Auth/>} />
        </Routes>
    </div>
  )
}

export default AllRoutes