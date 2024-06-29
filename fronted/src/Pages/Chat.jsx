import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Box } from "@chakra-ui/react"
const getData = async () => {
  return await axios.get("/data")
}

const Chat = () => {
  

  




  return (
    <div>Chat
    </div>
  )
}

export default Chat