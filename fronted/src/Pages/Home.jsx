import { Center, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
      <Center><Heading>This is Home page</Heading></Center>
    </div>
  )
}

export default Home