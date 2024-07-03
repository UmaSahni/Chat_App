import { Box, Button, Flex, Input, useToast } from '@chakra-ui/react'
import React, { useContext, useState, useEffect } from 'react'
import { ChatContext } from '../../Context/ChatProvider'
import axios from 'axios'
import UserSekeleton from './UserSekeleton'
import UserListItem from './UserListItem'

const SearchUser = () => {
    const [search, setSearch] = useState("")
    const [searchData, setSearchData] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState(false)
    

    const toast = useToast()
    const { user, setSelectedChat, chats, setChats } = useContext(ChatContext)

    // Function to search users
    const searchUser = async () => {
        if (!search) return

        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.get(`http://localhost:8080/user?search=${search}`, config)
            console.log(chats)
           
            if(!chats.find((c)=>c._id === data._id)) setChats([data, ...chats])
            
            setSearchData(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast({
                position: 'top-left',
                title: "Error Occured",
                description: "Failed to load the search results",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }

    // Trigger search as user types
    useEffect(() => {
        if (search) {
            searchUser()
        } else {
            setSearchData([]) // Clear search results when input is empty
        }
    }, [search]) // Run this effect when 'search' state changes

    const accessChat = async(userId) => {
        // Your function to start chat with user
        console.log("Access chat with user:", userId)
        try {
            setLoadingChat(true)
            const config = {
                headers: {
                    "Content-type":"application/json",
                    Authorization: `Bearer ${user.token}`
                },
               
            }
            const { data } = await axios.post(`http://localhost:8080/chat`, {userId}, config)
            setLoadingChat(false)
            setSelectedChat(data)
            console.log(data)
            setSearch("")
        } catch (error) {
            setLoadingChat(false)
            toast({
                position: 'top-left',
                title: "Error Occured",
                description: "Failed to load the search results",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }

    return (
        <Box w={"100%"} position={"relative"} p={4}>
            <Flex>
                <Input
                    width={"100%"}
                    border={"2px solid green"}
                    placeholder='Search by name or email'
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
            </Flex>
            {search && (
                <Box backgroundColor={"white"} position={"absolute"} zIndex={1000} w={"100%"} mt={2} borderRadius={"md"} boxShadow={"lg"}>
                    {loading ? (
                        <UserSekeleton />
                    ) : (
                        searchData.length > 0 ? (
                            searchData.map(user => (
                                <UserListItem
                                    key={user._id}
                                    name={user.name}
                                    email={user.email}
                                    pic={user.pic}
                                    handleFunction={() => accessChat(user._id)}
                                />
                            ))
                        ) : (
                            <Box p={4}>No results found</Box>
                        )
                    )}
                </Box>
            )}
        </Box>
    )
}

export default SearchUser
