import { Center, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HeroSection from '../Components/LandingPage/HeroSection'
import Navbar from '../Components/LandingPage/Navbar'

const Home = () => {

const navigate = useNavigate()

// useEffect(()=>{
// const user = JSON.paarse(localStorage.getItem("userInfo")) || {}
// if(user) navigate("/chat")
//   else{
// navigate("/auth")}
// },[navigate])


  return (
    <div>
      
        <Navbar/>
        <HeroSection/>
      
    </div>
  )
}

export default Home