import React from 'react'
import{Routes, Route} from "react-router-dom"
import Home from './Home'
import Chat from './Chat'
import Auth from './Auth'
const AllRoutes = () => {
  return (
    <div>
        <Routes>
              <Route path='/' element={<Home/>} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/auth' element={<Auth/>} />
        </Routes>
    </div>
  )
}

export default AllRoutes