import React, { useContext } from 'react'
import { ChatContext } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react'
import SingleChat from './miscellaneous/SingleChat'

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } = useContext(ChatContext)

  return (
   <Box
   display={{base:selectedChat ?"flex" : "none", md:"flex"}}
   alignItems={"center"}
   flexDir={"column"}
   p={3}
  bg={"#a0aeb4"}
  w={{base:"100%", md:"68%"}}

  borderWidth={"1px"}
   >
    
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}  />

   </Box>
  )
}

export default ChatBox