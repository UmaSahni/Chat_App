import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { Box, Flex,  } from "@chakra-ui/react"
import { ChatContext } from '../Context/ChatProvider'
import SidebarWithHeader from '../Components/miscellaneous/SidebarWithHeader'


const Chat = () => {
  
  const { user } = useContext(ChatContext)




  return (
    <div>
      <SidebarWithHeader >{<Box>I am content here</Box>}</SidebarWithHeader>
    </div>
  )
}

export default Chat