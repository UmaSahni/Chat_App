import React, { useContext } from "react";
import { ChatContext } from "../../Context/ChatProvider";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { getSender } from "../../config/ChatLogics";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModal";
import UpdateGroupModal from "./UpdateGroupModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const {
    user,
    setUser,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
  } = useContext(ChatContext);
  console.log(selectedChat);
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
            bg={"#e8e8e8"}
            w={"100%"}
            h={"100%"}
            borderRadius={"lg"}
            overflowY={"scroll"}
          >
            {/* Messages here */}
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
