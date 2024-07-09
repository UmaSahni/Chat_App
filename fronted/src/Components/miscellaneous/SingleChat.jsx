import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../Context/ChatProvider";
import { Box, Flex, FormControl, IconButton, Input, Spinner, Text, useToast } from "@chakra-ui/react";
import { getSender } from "../../config/ChatLogics";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModal";
import UpdateGroupModal from "./UpdateGroupModal";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import "./styles.css"
import SrcollableChat from "../SrcollableChat";
const SingleChat = ({ fetchAgain, setFetchAgain }) => {

  const {
    user,
    selectedChat,
    setSelectedChat,
  } = useContext(ChatContext);

const {token} = useContext(AuthContext)
const [messages, setMessages] = useState([])
const [loading, setLoding] = useState(false)
const [newMessage,setNewMessage] = useState("")
const toast = useToast()

const fetchMessages = async () =>{
  if(!selectedChat) return
  try {
    setLoding(true)
   
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    
    const { data } = await axios.get(`http://localhost:8080/message/${selectedChat._id}`, config)

    console.log(data)
    setMessages(data)
    setLoding(false)
  } catch (error) {
    setLoding(false)
    toast({
      title: "Error occured unable to load messages",
      position: "top",
      status: "error",
      duration: 5000,
      isClosable: true,
    })
  }
}

useEffect(()=>{
fetchMessages()
},[selectedChat])


  const sendMessage = async(event) =>{
  if(event.key === "Enter" && newMessage){
    try {
      
      const config ={
        headers:{
          "Content-type":"application/json",
           Authorization : `Bearer ${token}`
        }
      }
      setNewMessage("")
      const { data } = await axios.post(`http://localhost:8080/message`, {
        chatId:selectedChat._id,
        content:newMessage
      }, config)

      console.log(data)
      setMessages([...messages, data])
    } catch (error) {
      toast({
        title: "Error occured",
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  }
  }
  const typingHandler =(e)=>{
  setNewMessage(e.target.value)
// Typing indicator logic here
  }

  // console.log(selectedChat);
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "1.2rem", md: "1.9rem" }}
            pb={3}
            px={2}
            w={"100%"}
            justifyContent={{ base: "space-between" }}
            alignItems={"center"}
          >
            <Flex justifyContent={{ base: "space-between" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                icon={<ArrowBackIcon />}
                onClick={() => setSelectedChat("")}
              />

              {selectedChat.isGroupChat === false ? (
                <>
                  {getSender(user, selectedChat.users).name}
                  <ProfileModal user={getSender(user, selectedChat.users)} />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  {/* Update group chat modal */}
                    <UpdateGroupModal
                    fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} 
                      fetchMessages={fetchMessages}                   

                    />

                </>
              )}
            </Flex>
          </Text>

          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"flex-end"}
            p={3}
            bg={"#ebebebc9"}
            w={"100%"}
            h={"100%"}
            borderRadius={"lg"}
            overflowY={"scroll"}
          >
            {/* Messages here */}
            
            {
              loading ? (
                <Spinner 
                color="#000"
                size={"xl"}
                w={20}
                h={20}
                
                alignItems={"center"}
                margin={"auto"}
                />
              ) : 
              <>
              {/* All messages */}
              <div className="messages">
                <SrcollableChat messages={messages} />
              </div>
              </>
            }

            <FormControl isRequired mt={3} onKeyDown={sendMessage} >
              <Input
              color={"black"}
              bg={"#ffff"}
                focusBorderColor="transparent"
             border={"none"}
              placeholder="Enter a message"
              onChange={typingHandler}
              value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Flex h={"100%"} justifyContent={"center"} alignItems={"center"}>
          <Text color={"black"} fontSize={"2xl"}>
            Click on a user to start chating
          </Text>
        </Flex>
      )}
    </>
  );
};

export default SingleChat;
