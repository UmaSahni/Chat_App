import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Box } from "@chakra-ui/react"
const getData = async () => {
  return await axios.get("/data")
}

const Chat = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const callData = async () => {
      const data = await getData()
      setData(data.data)
      console.log(data)
    }
    callData()
  }, [])



  return (
    <div>Chat
      {data?.map((el) => <Box>name -
        {el.chatName}</Box>)}
    </div>
  )
}

export default Chat