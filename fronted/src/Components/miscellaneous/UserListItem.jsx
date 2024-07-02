import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'

const UserListItem = ({ name, email, pic, handleFunction } ) => {
  return (
   <Box
   onClick={handleFunction}
   cursor={"pointer"}
   bg={"#E8E8E8"}
   _hover={{
    background:"#38B2AC",
    color:"white"
   }}
   width={"100%"}
   display={"flex"}
   alignItems={"center"}
   color={"black"}
   my={2}
   >
<Avatar 
src={pic}
/>

<Box>
    <Text>{name}</Text>
    <Text
    fontSize={"xs"}
    >
        <b>Email: </b>
        {email}
    </Text>
</Box>
   </Box>
  )
}

export default UserListItem