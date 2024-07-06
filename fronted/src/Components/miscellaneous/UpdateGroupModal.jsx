import { ViewIcon } from '@chakra-ui/icons'
import { Box, Button, Center, FormControl, IconButton, Input, useDisclosure, useToast } from '@chakra-ui/react'
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

    const handleRemove =(user)=>{

    }

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

    const handleSearch =()=>{

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
                            onChange={(e)=>handleSearch(e.target.value)}
                            />
                        </FormControl>
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