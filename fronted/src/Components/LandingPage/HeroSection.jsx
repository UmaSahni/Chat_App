import { Box, Flex, Heading, Image } from '@chakra-ui/react'
import React from 'react'

const HeroSection = () => {
  return (
    <Flex justifyContent={"space-between"} 
    border={"1px solid red"}
    alignItems={"center"}
    >
        <Box mx={{lg:20, md:10, sm: 5}} >
            <Heading size={{lg:"2xl", md:"xl", sm: "md",}} >
                Connect Instantly
                <br></br>
                <span >With Family & Friends </span>
               
            </Heading>
        </Box>
        <Box>
            <Image w={{lg:"50%", md:"60%", sm: "60%",}} src='textingGirl.png' >

            </Image>
        </Box>
    </Flex>
  )
}

export default HeroSection