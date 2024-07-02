import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export const ChatContext = createContext()


const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [chats, setChats] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const navigate = useNavigate()



  return (
  <ChatContext.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}> 
    {children} 
    </ChatContext.Provider>)
}

export default ChatProvider