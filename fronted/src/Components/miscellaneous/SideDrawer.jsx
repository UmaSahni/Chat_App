import {
  Box,
  Button,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { BellIcon, SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatContext } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserSekeleton from "./UserSekeleton";
import UserListItem from "./UserListItem";
import { AuthContext } from "../../Context/AuthContext";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
    const { user, setSelectedChat,  chats, setChats } = useContext(ChatContext);
  const navigate = useNavigate();
  const toast = useToast();
 const {token, setToken} = useContext(AuthContext)

  const logoutHandler = () => {
    setToken(null);
    navigate("/auth");
  };

  const handleSearch = async () => {
    if (!search) {
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
        `http://localhost:8080/user?search=${search}`,
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

    const accessChat = async(userId) => {
        try {
            setLoadingChat(true)
            const config = {
                headers: {
                    "Content-type":"application/json",
                    Authorization: `Bearer ${token}`,
                }
                
            };
            const { data } = await axios.post( `http://localhost:8080/chat`,{userId} ,config);
            // console.log(data)
            if(!chats.find((c)=>c._id == data._id)) setChats([data, ...chats])

            setSelectedChat(data)
            setLoadingChat(false)
        } catch (error) {
            setLoadingChat(false)
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

  // Adding console.log to debug
  const handleDrawerOpen = () => {
    onOpen();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignContent={"center"}
        bg={"#a0aeb4"}
        w={"100%"}
        p={"5px 10px 5px 10px"}
        borderWidth={"2"}
      >
        <Tooltip
          hasArrow
          label="Search users to chat with them"
          bg="gray.300"
          color="black"
        >
          <Button onClick={handleDrawerOpen} variant={"ghost"}>
            <SearchIcon />
            <Text px={4} display={{ base: "none", md: "flex" }}>
              Search users
            </Text>
          </Button>
        </Tooltip>

        <Text
          fontSize={"2xl"}
          color={"#2b2d42"}
          fontFamily={"Oleo Script, system-ui"}
        >
          BaatCheet
        </Text>

        <Box>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize={"2xl"} m={1} />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                src={user.pic}
                size={"sm"}
                cursor={"pointer"}
                name={user.name}
              />
            </MenuButton>
            <MenuList color={"black"} bg={"#a0aeb4"}>
              <ProfileModal user={user} >
                <MenuItem
                  _hover={{ bg: "#79868b", color: "white" }}
                  bg={"#a0aeb4"}
                >
                  My Profile
                </MenuItem>
              </ProfileModal>
              <MenuItem
                onClick={logoutHandler}
                _hover={{ bg: "#79868b", color: "white" }}
                bg={"#a0aeb4"}
              >
                Log Out
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      <Drawer  placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />

        <DrawerContent>
                  <DrawerHeader bg={"#a0aeb4"} >Search Users</DrawerHeader>
                  <DrawerBody bg={"#a0aeb4"} >
            <Box display={"flex"} pb={2}>
              <Input
                placeholder="Search user by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>

                      {loading ? (
                          <UserSekeleton />
                      ) : (
                          searchResult.length > 0 ? (
                              searchResult.map(user => (
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

            {loadingChat && <Spinner display={"flex"} ml={"auto"} />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SideDrawer;
