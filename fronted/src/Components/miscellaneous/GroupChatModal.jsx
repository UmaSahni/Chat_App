import React, { useContext, useEffect, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useToast,
    Center,
    FormControl,
    Input,
    Text,
    Flex,
} from '@chakra-ui/react'
import { ChatContext } from '../../Context/ChatProvider'
import { AuthContext } from '../../Context/AuthContext'
import axios from 'axios'
import UserListItem from './UserListItem'
import UserBadgeItem from './UserBadgeItem'

const GroupChatModal = ({ children, onClose , isOpen}) => {
    const  [groupChatName, setGroupChatName] = useState("")
    const [selectedUsers, setSelectedUsers] = useState([])
    const [search, setSearch] = useState("")
    const  [searchResult, setSearchResult] = useState([])
    const [loading, setLoading]  = useState(false)

    const toast = useToast()
    const { chats, setChats } = useContext(ChatContext)
    const {token} = useContext(AuthContext)
    
    const handleSearch = async(query)=>{
        setSearch(query)
        if(!query) return
        try {
            setLoading(true)
            
            const config = {
                headers: {
                    Authorization:`Bearer ${token}`
                }
            }

            const  {data}  = await axios.get(`http://localhost:8080/user?search=${query}`, config)
            
            setSearchResult(data)
            setLoading(false)
            



        } catch (error) {
            setLoading(false);
            toast({
                position: "top-left",
                title: "Error Occured",
                description: "Failed to load the search results",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }

    }
    const handleGroup = (userToAdd) => {
        // console.log(selectedUsers, "selectedUsers")
        if (selectedUsers.includes(userToAdd)){
            toast({
                title:"User Already Added",
                position: "top",
                status: "warning",
                duration: 5000,
                isClosable: true,
            })
            return
        }
        setSelectedUsers([...selectedUsers,userToAdd])

    }

    const handleDelete = (user) =>{
       const filteredList = selectedUsers.filter((el)=>user._id  !== el._id) 
       setSelectedUsers(filteredList)
    }

    const handleSubmit = async()=>{
        
        if(selectedUsers.length <= 1){
            toast({
                title: "Insufficient users",
                position: "top",
                status: "warning",
                description:"Please add minimum 2 users",
                duration: 5000,
                isClosable: true,
            })
            return
        }
        else if(!groupChatName ){
            toast({
                title: "Please provide group name",
                position: "top",
                status: "warning",
                duration: 5000,
                isClosable: true,
            })
            return
        }

        try {
           
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.post(`http://localhost:8080/chat/group`, {
                name: groupChatName,
                users: JSON.stringify(selectedUsers.map((u) => u._id))
                },
                config
        )
        // console.log("respone from api", data)
            // Use functional update
            setChats((prevChats) => [...data, ...prevChats]); // here was the bug --> setChats((prevChats) => [data, ...prevChats])
        onClose()
        // console.log("Chat is updated:", chats)

        toast({
            title:"New Group Chat Created!",
            status:"success",
            duration:5000,
            isClosable:true,
            position:"top-left"
        })
        
        } catch (error) {
            onClose()
            toast({
                title: "Error Occured! Please try later.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-left"
            })
        }

        

    }

    
  return (
    <>{children}
          <Modal isCentered isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                  <ModalHeader
                  fontSize={"2rem"}
                  display={"flex"}
                  fontWeight={"bold"}
                
                  justifyContent={"center"}
                  >Create Group Chat</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Center flexDirection={"column"} >
                         <FormControl>
                            <Input placeholder='Chat Name'
                            mb={3}
                            onChange={(e)=>setGroupChatName(e.target.value)}
                            />
                         </FormControl>
                                
                          <FormControl>
                              <Input placeholder='Add Users eg: Suman, Uma, Ram'
                                  mb={1}
                                  onChange={(e) => handleSearch(e.target.value)}
                              />
                          </FormControl>
                          {/* Shaow Selected User */}
                          <Flex flexDirection={"row"}  >
                            {
                               
                                selectedUsers.map((u)=>{
                                    return <UserBadgeItem name={u.name} handleFunction={()=>handleDelete(u)} key={u._id} />
                                })
                            }
                          </Flex> 

                          {/* Render Search Users */}
                          {
                            loading ? <Text>Loading...</Text> : (
                                searchResult?.slice(0,4).map((user)=>{
                                   return <UserListItem email={user.email} pic={user.pic} name={user.name} key={user._id} handleFunction={()=>handleGroup(user)} />
                                })
                            )
                          }
                    </Center>
                    
                  </ModalBody>

                  <ModalFooter>
                      <Button colorScheme='blue'  onClick={handleSubmit}>
                          Create
                      </Button>
                  </ModalFooter>
              </ModalContent>
          </Modal>
    </>

  )
}

export default GroupChatModal