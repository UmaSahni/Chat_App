import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Context/ChatProvider";
import { Box, useToast, Text, Button, Stack } from "@chakra-ui/react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { AddIcon } from "@chakra-ui/icons";
import UserSekeleton from "./miscellaneous/UserSekeleton";
import { getSender } from "../config/ChatLogics";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const {
    user,
    setUser,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
  } = useContext(ChatContext);
  const toast = useToast();
  const { token } = useContext(AuthContext);

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`http://localhost:8080/chat`, config);
      console.log(data, "lists of the chats");
      setChats(data);
    } catch (error) {
      toast({
        position: "top-left",
        title: "Error Occurred!",
        description: "Failed to load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    setLoggedUser(user);
    fetchChats();
  }, []);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir={"column"}
      alignItems={"center"}
      p={3}
      bg={"#a0aeb4"}
      w={{ base: "100%", md: "31%" }}
      borderWidth={"1px"}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        display={"flex"}
        w={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text>My Chats</Text>
        <Button>
          {" "}
          <AddIcon mr={3} /> Create Group Chat
        </Button>
      </Box>

      <Box
        display={"flex"}
        flexDir={"column"}
        p={3}
        bg={"#F8F8F8"}
        w={"100%"}
        h={"100%"}
        borderRadius={"lg"}
        overflowY={"hidden"}
      >
        {chats ? (
          <Stack overflowY={"scroll"}>
            {chats.map((chat) => {
              return (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor={"pointer"}
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  key={chat._id}
                >
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                </Box>
              );
            })}
          </Stack>
        ) : (
          <UserSekeleton />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
