import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { Box, Flex,  } from "@chakra-ui/react"
import { ChatContext } from '../Context/ChatProvider'
import SideDrawer from '../Components/miscellaneous/SideDrawer'
import MyChats from '../Components/MyChats'
import ChatBox from '../Components/ChatBox'


const Chat = () => {
  
  const  user  = JSON.parse(localStorage.getItem("userInfo")) 
  const [fetchAgain, setFetchAgain] = useState(false)

console.log(user)


  return (
    <Box
      bg={"#2b2d42"}
      minH={"100vh"}
      backgroundImage="url('file.svg')"
      backgroundPosition="center"
      color={"white"}
    >

   {user && <SideDrawer/>}

<Box
display={"flex"}
justifyContent={"space-between"}
width={"100%"}
height={"91vh"}
padding={4}
>
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
</Box>


    </Box>
  )
}

export default Chat