import { ViewIcon } from '@chakra-ui/icons'
import { Box, Button, Center, FormControl, IconButton, Input, Spinner, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { ChatContext } from '../../Context/ChatProvider'
import UserBadgeItem from './UserBadgeItem'
import { AuthContext } from '../../Context/AuthContext'
import axios from 'axios'
import UserListItem from './UserListItem'

const UpdateGroupModal = ({ fetchAgain, setFetchAgain }) => {
    const {
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
    } = useContext(ChatContext);
    const [groupChatName, setGroupChatName] = useState("")
    const [search,setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [renameLoading, setRenameLoading] = useState(false)
    const {token} = useContext(AuthContext)
    const toast = useToast()



    const handleRename = async()=>{
        if(!groupChatName) return

        const config = {
            headers :{
                Authorization : `Bearer ${token}`
            }
        }
        setRenameLoading(true)

        try {
            const { data } = await axios.put(`http://localhost:8080/chat/rename`, {
                chatId: selectedChat._id,
                chatName: groupChatName
            },
        config)
        console.log(data)
            toast({
                position: "top-right",
                title: "Group name updated",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            setSelectedChat(data)
            setFetchAgain(!fetchAgain)
            setRenameLoading(false)
            setGroupChatName("")
            onClose()

        } catch (error) {
            setRenameLoading(false)
            toast({
                position: "top-left",
                title: "Error Occured",
                description: "Failed to update chat name",
                status: "error",
                duration: 5000,
                isClosable: true,
                
            });
        }
    }

    const handleSearch = async (e) => {
        const searchValue = e.target.value
        if (!searchValue) {
            toast({
                position: "top-left",
                title: "Please Enter Something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get(
                `http://localhost:8080/user?search=${searchValue}`,
                config
            );
            // console.log(data);
            setSearchResult(data);
            // if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats])


            setLoading(false);
        } catch (error) {
            console.log(error)
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
    };

    const handleAddUser =async(user1)=>{
    // If in the list of selected user the user is already there
    const checkUserPresent = selectedChat.users.find((u)=>u._id == user1._id)
    if(checkUserPresent) {
        toast({
            position: "top-left",
            title: "User is already in group",
            status: "warning",
            duration: 5000,
            isClosable: true,
        });
    }

    // If the user is admin or not
    if(selectedChat.groupAdmin._id !== user._id){
        toast({
            position: "top-left",
            title: "Only admin can add someone!",
            status: "error",
            duration: 5000,
            isClosable: true,
        });
    }

    try {
        setLoading(true)
        const config = {
            headers:{
                Authorization : `Bearer ${token}`
            }
        }
        const { data } = await axios.put(`http://localhost:8080/chat/addtogroup`,{
            chatId:selectedChat._id,
            userId:user1._id
        },config)
        setSelectedChat(data)
        setFetchAgain(!fetchAgain)
        setLoading(false)
    } catch (error) {
        toast({
            position: "top-left",
            title: "Error Occured",
            description: error.message.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,

        });
    }

    }

    const handleRemove = async(user1) => {
        if(selectedChat.groupAdmin._id !== user._id && user1._id !== user._id){
            toast({
                position: "top-left",
                title: "Only admin can remove someone!",
                status: "error",
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
        const { data } = await axios.put(`http://localhost:8080/chat/groupremove`, {
            chatId: selectedChat._id,
            userId: user1._id
        }, config)

        // if the user has removed himself
        user1._id == user._id ? setSelectedChat() : setSelectedChat(data)
        
        setFetchAgain(!fetchAgain)
        setLoading(false)
        } catch (error) {
            toast({
                position: "top-left",
                title: "Error Occured",
                description: error.message.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,

            });
        }

    }


  return (
      <>
          <IconButton display={{base:"flex"}} icon={<ViewIcon/>} onClick={onOpen}></IconButton>

          <Modal isCentered isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
           
                  <ModalHeader
                  fontSize={["0.5rem", "2rem"]}
                  display={'flex'}
                  justifyContent={"center"}
                  >{selectedChat.chatName}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                     <Box>
                        {selectedChat.users.map((u)=>(
                            <UserBadgeItem
                            key={u._id}
                            name={u.name}
                            handleFunction={()=>handleRemove(u)}
                            />
                        ))}
                     </Box>

                     {/* Rename group */}
                     <FormControl display={"flex"}>
                        <Input
                        placeholder='Group name'
                        mb={3}
                        value={groupChatName}
                        onChange={(e)=>setGroupChatName(e.target.value)}
                        />
                        <Button
                        variant={"solid"}
                        colorScheme='teal'
                        ml={1}
                        isLoading={renameLoading}
                        onClick={handleRename}
                        >
                            Update
                        </Button>
                     </FormControl>


                     {/* Add users to group */}
                        <FormControl>
                            <Input
                            placeholder='Add User to group'
                            mb={1}
                            onChange={(e)=>handleSearch(e)}
                            />
                        </FormControl>

                        {/* User list Item */}
                        {
                            loading ? (
                                <Spinner size={"lg"} />
                            ):
                            (
                                searchResult?.map((user)=>(
                                    <UserListItem
                                    key={user._id}
                                    name={user.name}
                                    email={user.email}
                                    pic={user.pic}
                                    handleFunction={()=>handleAddUser(user)}
                                    />
                                ))
                            )
                        }
                  </ModalBody>

                  <ModalFooter>
                      <Button onClick={()=>handleRemove(user)} colorScheme='red' mr={3} >
                         Leave Group
                      </Button>
                  </ModalFooter>
                  
              </ModalContent>
          </Modal>
      </>
  )
}

export default UpdateGroupModal